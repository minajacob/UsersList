import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ControlsModule } from '../controls/controls.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './services/users.service';
import { UserPageComponent } from './user-page/user-page.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDialogComponent } from './user-dialog/user-dialog.component';



@NgModule({
  declarations: [
    ListComponent,
    UserPageComponent,
    UserFormComponent,
    UserDialogComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    ControlsModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ],
})
export class UsersModule { }
