import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageRoutingModule } from './user-routing.module';
import { ProfilePage } from './pages/profile/profile.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FollowingFollowerPage } from './pages/following-follower/following-follower.page';

@NgModule({
    declarations: [
        ProfilePage,
        FollowingFollowerPage,
    ],
    imports: [
        CommonModule,
        SharedModule,
        UserPageRoutingModule,
    ]
})
export class UserModule {
}
