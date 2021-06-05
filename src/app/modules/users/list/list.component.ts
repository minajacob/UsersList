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
  @ViewChild("confirmDeleteUser") confirmDeleteUser!: TemplateRef<any>;

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
    this.dialog.opeUser({ user: {} as IUser }).afterClosed().subscribe(res => {
      if (res) {
        this.dataSource.data = [...this.dataSource.data, res as IUser];
        this.totalLength += 1;
      }
    });
  }

  viewUser(user: IUser) {
    this.dialog.opeUser({ user, viewMode: true, title: `${user.first_name} ${user.last_name}` }).afterClosed().subscribe(res => {
      if (res) {
        Object.assign(user, res);
      }
    });
  }

  editUser(event: Event , user: IUser) {
    event.stopPropagation();
    this.dialog.opeUser({ user, editMode: true, title: `${user.first_name} ${user.last_name}` }).afterClosed().subscribe(res => {
      if (res) {
        Object.assign(user, res);
      }
    });
  }

  deleteUser(event: Event ,user: IUser) {
    event.stopPropagation();
    this.selectedUser = user;
    let deleteUser = new Observable<void>(sub => {
      this.usersSvc.deleteUser(user.id).subscribe(() => {
        sub.next();
        this.dataSource.data = [...this.dataSource.data.filter(u => u.id !== user.id)];
        this.totalLength -= 1;
      })
    })
    this.dialog.open({ data: { title: `Are you sure to detele this user ?`, template: this.confirmDeleteUser, okColor: "warn", OkAction: deleteUser }, disableClose: true});
  }

  viewUserInPage(event: Event ,user: IUser) {
    event.stopPropagation();
    this.router.navigateByUrl(`users/${user.id}`);
  }

}
