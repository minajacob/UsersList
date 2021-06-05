import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/base/api.model';
import { UsersService } from '../services/users.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user: IUser = { first_name: "", last_name: "", email: "", id: 0, avatar: "" };
  viewMode = false;
  userId: number = 0;

  @ViewChild("userCom") userForm!: UserFormComponent;

  constructor(private usersSvc: UsersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      if (this.userId) {
        this.viewMode = true;
        this.usersSvc.getById(this.userId).subscribe(user => {
          this.user = user.data;
        })
      }
    })
  }

  onSubmit(user: IUser){
    if (this.userId > 0) {
      this.usersSvc.update({ ...user, id: this.userId }).subscribe(res => {
        this.viewMode = true;
      })
    } else {
      this.usersSvc.add(user).subscribe(res => {
        this.userForm.reset();
      })
    }
  }

  editUser(){
    this.viewMode = false;
  }

}
