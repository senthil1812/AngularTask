import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: UserAddComponent },
  { path: 'list-user', component: UserListComponent },
  { path: 'edit-user', component: UserDetailComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
