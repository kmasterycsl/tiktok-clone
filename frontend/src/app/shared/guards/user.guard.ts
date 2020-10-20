import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private navController: NavController,
    ) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isLogined()) {
            return true;
        }
        return this.navController.navigateRoot(['/tabs/auth/login'], {
            queryParams: {
                back: state.url
            }
        });

    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(next, state);
    }

}
