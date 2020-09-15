import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { LoginPage } from './login/login.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    AuthPageRoutingModule,
    SharedModule
  ],
  declarations: [LoginPage]
})
export class AuthPageModule {}
