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

  @Input() user: IUser = { first_name: "", last_name: "", avatar: "", email: "", id: 0 };
  @Output() onSubmit = new EventEmitter<IUser>();

  @ViewChild("ngForm") form!: FormGroupDirective;

  constructor() { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = new FormGroup({
      "first_name": new FormControl(this.user.first_name, [Validators.required]),
      "last_name": new FormControl(this.user.last_name, [Validators.required]),
      "email": new FormControl(this.user.email, [Validators.required]),
      "avatar": new FormControl(this.user.avatar),
    })

    this.image = this.userForm.value.avatar || "assets/imgs/default_avatar_placeholder.png";
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
}
