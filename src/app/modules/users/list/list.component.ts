import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IFilter, IUser } from 'src/app/base/api.model';
import { DialogService } from 'src/app/base/services/dialog.service';
import { UsersService } from '../services/users.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['image', 'first_name', 'last_name', 'email', 'actions'];
  dataSource = new MatTableDataSource<IUser>([]);
  totalLength: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedUser!: IUser;
  @ViewChild("userformCom") userformTemplate!: TemplateRef<any>;

  constructor(private usersSvc: UsersService, private router: Router, private dialog: DialogService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.getAllUsers();
    })
  }

  getAllUsers() {
    let filter: IFilter = { page: 1, per_page: 5 };
    if (this.paginator) {
      filter = { page: this.paginator.pageIndex + 1, per_page: this.paginator.pageSize };
    }

    this.usersSvc.list(filter).subscribe(res => {
      this.dataSource.data = res.data;
      this.totalLength = res.total;
    })
  }

  addNewUser() {
    this.router.navigateByUrl("users/new");
  }

  addNewUserFromModal() {
    this.dialog.addUser({ user: {} as IUser }).afterClosed().subscribe(res => {
      if (res) {
        this.dataSource.data = [...this.dataSource.data, res as IUser];
        this.totalLength += 1;
      }

    });
  }

  // addUserRequest() {
  //   new Observable(subject => {
  //     this.user
  //   })
  // }

  getUser(user: IUser) {
    this.selectedUser = user;
    this.dialog.open({ data: { title: `${user.first_name} ${user.last_name}`, template: this.userformTemplate }, disableClose: true});
  }

}
