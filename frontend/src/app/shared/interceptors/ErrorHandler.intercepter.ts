import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NoticeService } from '@services/notice.service';
import { map, catchError } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(
        private noticeService: NoticeService,
        private navController: NavController,
        private router: Router,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && this.router.url !== '/tabs/auth/login') {
                    this.navController.navigateRoot(['/tabs/auth/login'], {
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