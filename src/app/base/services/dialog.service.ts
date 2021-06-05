import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDialogComponent } from 'src/app/modules/users/user-dialog/user-dialog.component';
import { IUserDialogData } from 'src/app/modules/users/user-dialog/user-dialog.model';
import { IUser } from '../api.model';
import { DialogComponent } from '../components/dialog/dialog.component';
import { IDialogData } from '../components/dialog/dialog.model';

interface IDialogConfig extends MatDialogConfig {
  data: IDialogData;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  defualtOptions: IDialogConfig = {
    width: "400px",
    data: {
      title: "",
      template: null
    } as IDialogData
  }

  constructor(public dialog: MatDialog) { }

  open(config: IDialogConfig) {
    return this.dialog.open(DialogComponent, { ...this.defualtOptions, ...config });
  }

  addUser(config: IUserDialogData) {
    return this.dialog.open<UserDialogComponent, IUserDialogData, IUser>(UserDialogComponent, { ...this.defualtOptions, data: { title: "Add New User", ...config }, disableClose: true });
  }
}
