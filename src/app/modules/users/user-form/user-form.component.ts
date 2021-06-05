import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IUser } from 'src/app/base/api.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  image!: string;
  private _user: IUser = { first_name: "", last_name: "", avatar: "", email: "", id: 0 };
  private _viewMode = false;

  @Input() set user(user: IUser){
    if (user) {
      this._user = user;
    }    
    this.initUserForm();
  }

  @Input() set viewMode(val: boolean) {
    if (val == this._viewMode) {
      return;
    }
    this._viewMode = val;
    if (val) {
      this.readOnly();
    } else {
      this.userForm.enable();
    }
  }

  @Output() onSubmit = new EventEmitter<IUser>();

  @ViewChild("ngForm") form!: FormGroupDirective;

  constructor() { }

  ngOnInit(): void {}

  initUserForm() {
    this.userForm = new FormGroup({
      "first_name": new FormControl(this._user.first_name, [Validators.required]),
      "last_name": new FormControl(this._user.last_name, [Validators.required]),
      "email": new FormControl(this._user.email, [Validators.required]),
      "avatar": new FormControl(this._user.avatar),
    })

    this.image = this.userForm.value.avatar;

    if (this._viewMode) {
      this.readOnly();
    }
  }

  imageUploaded(event: Event) {
    let inputFileCtrl = event.target as HTMLInputElement;
    let self = this;
    let file = inputFileCtrl.files?.item(0);
    let reader = new FileReader();
    reader.onload = function (e) {
      self.image = e.target?.result as string;
      self.userForm.patchValue({ avatar: self.image });
    }
    reader.readAsDataURL(file as Blob);

  }

  submit(event: Event){
    this.form.onSubmit(event);
  }

  ngSubmit(form: FormGroupDirective){
    if (form.valid) {
      this.onSubmit.emit(form.value);
    }
  }

  readOnly(){
    this.userForm.disable();
  }

  get disabled() {
    return this.userForm.disabled;
  }

  reset() {
    this.image = "";
    this.form.resetForm();
    // this.initUserForm();
  }
}
