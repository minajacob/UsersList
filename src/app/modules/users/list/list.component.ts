import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IFilter, IUser } from 'src/app/base/api.model';
import { listService } from './list.service';

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

  constructor(private listSvc: listService) { }

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

    this.listSvc.list(filter).subscribe(res => {
      this.dataSource.data = res.data;
      this.totalLength = res.total;
    })
  }

  addNewUser() {
    
  }

}
