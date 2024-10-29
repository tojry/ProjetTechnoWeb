import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { AccountGuard } from './shared/guards/account.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AccountGuard] },
  { path: 'user/register', component: CreateUserComponent, canActivate: [AccountGuard] },
  { path: 'user', component: UserInfoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }