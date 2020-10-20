import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NoticeService } from '@cores/services/notice.service';
import { catchError, map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(
        private noticeService: NoticeService,
        private authService: AuthService,
        private navController: NavController,
        private router: Router,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !this.router.url.startsWith('/tabs/auth/login')) {
                    this.authService.resetAuth();
                    this.navController.navigateForward(['/tabs/auth/login'], {
                        queryParams: {
                            back: this.router.url
                        }
                    });
                    this.noticeService.showToast({
                        message: 'Please login again',
                        color: 'danger'
                    });
                    return throwError(error);
                }
                this.noticeService.showToast({
                    message: error?.error?.message || error.message || 'Unexpected error',
                    color: 'danger'
                });
                return throwError(error);
            }));
    }
}
