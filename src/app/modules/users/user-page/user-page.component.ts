import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/base/api.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private usersSvc: UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(user: IUser){
    console.log(user);
    this.usersSvc.add(user).subscribe(res => {
      console.log(res);
    })
    
  }

}
