import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilePage } from './pages/profile/profile.page';
import { UserGuard } from 'src/app/shared/guards/user.guard';
import { FollowingFollowerPage } from './pages/following-follower/following-follower.page';

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
export class UserPageRoutingModule {
}
