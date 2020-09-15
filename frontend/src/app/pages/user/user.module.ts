import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageRoutingModule } from './user-routing.module';
import { ProfilePage } from './profile/profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserPageRoutingModule,
  ]
})
export class UserModule { }
