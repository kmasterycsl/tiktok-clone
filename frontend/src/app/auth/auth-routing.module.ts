import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPage } from './pages/login/login.page';
import { GuestGuard } from 'src/app/shared/guards/guest.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginPage,
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard]
    },
    {
        path: '',
        redirectTo: 'login'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthPageRoutingModule {
}
