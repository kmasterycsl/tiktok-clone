import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { STORAGE_KEYS, StorageService } from '../../core/services/storage.service';

@Injectable()
export class InjectTokenInterceptor implements HttpInterceptor {
    constructor(
        private storageService: StorageService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + this.storageService.get(STORAGE_KEYS.TOKEN))});
        return next.handle(request);
    }
}
