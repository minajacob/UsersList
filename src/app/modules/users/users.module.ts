import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ControlsModule } from '../controls/controls.module';
import { UsersRoutingModule } from './users-routing.module';
import { listService } from './list/list.service';



@NgModule({
  declarations: [
    ListComponent
  ],
  providers: [
    listService
  ],
  imports: [
    CommonModule,
    ControlsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
