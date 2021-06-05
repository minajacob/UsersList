import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { UserPageComponent } from "./user-page/user-page.component";

const routes: Routes = [
  { path: "", component: ListComponent },
  { path: "new", component: UserPageComponent },
  { path: ":userId", component: UserPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }