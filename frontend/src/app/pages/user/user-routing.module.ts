import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile/profile.page';
import { GuestGuard } from 'src/app/shared/guards/guest.guard';
import { UserGuard } from 'src/app/shared/guards/user.guard';
import { FollowingFollowerPage } from './following-follower/following-follower.page';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [UserGuard],
    canActivateChild: [UserGuard]
  },
  {
    path: 'profile/:userId',
    component: ProfilePage,
    canActivate: [UserGuard],
    canActivateChild: [UserGuard]
  },
  {
    path: 'profile/:userId/following-follower',
    component: FollowingFollowerPage,
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
export class UserPageRoutingModule { }
