import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login/login.page';
import { ProfilePage } from './profile/profile.page';
import { GuestGuard } from 'src/app/shared/guards/guest.guard';
import { UserGuard } from 'src/app/shared/guards/user.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard]
  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [UserGuard],
    canActivateChild: [UserGuard]
  },
  {
    path: '',
    redirectTo: 'profile'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule { }
