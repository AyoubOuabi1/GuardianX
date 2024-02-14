import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {unAuthGuard} from "./guard/auth/un-auth.guard";
import {authGuard} from "./guard/auth/auth.guard";
import {AdminpageComponent} from "./pages/admin/adminpage.component";
import {UserpageComponent} from "./pages/user/userpage.component";
import {roleGuard} from "./guard/role-guard.guard";
import {UnauthorizedComponent} from "./pages/unauthorized/unauthorized.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [unAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [unAuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminpageComponent, canActivate: [roleGuard] },
  { path: 'user', component: UserpageComponent, canActivate: [roleGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: '**', redirectTo: '/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
