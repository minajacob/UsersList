import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/base/api.model';
import { UsersService } from '../services/users.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { IUserDialogData } from './user-dialog.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit, AfterViewInit {

  @ViewChild(UserFormComponent) userForm!: UserFormComponent;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserDialogData, private usersSvc: UsersService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.data.viewMode) {
      this.userForm.readOnly();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ok(event: Event, userForm: UserFormComponent){
    userForm.submit(event);
  }

  onSubmit(user: IUser) {
    if (!this.data.editMode) {
      this.usersSvc.add(user).subscribe(res => {
        this.dialogRef.close(user);
      })
    } else {
      this.usersSvc.update(user).subscribe(res => {
        this.dialogRef.close(user);
      })
    }
    
  }

}
