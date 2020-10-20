import { NgModule } from '@angular/core';

import { AuthPageRoutingModule } from './auth-routing.module';

import { LoginPage } from './pages/login/login.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        AuthPageRoutingModule,
        SharedModule
    ],
    declarations: [LoginPage]
})
export class AuthPageModule {
}
