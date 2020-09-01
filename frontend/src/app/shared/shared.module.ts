import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTweetComponent } from './components/home-tweet/home-tweet.component';
import { InjectBaseURLInterceptor } from './interceptors/InjectBaseURL.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './interceptors/ErrorHandler.intercepter';
import { InjectTokenInterceptor } from './interceptors/InjectToken.intercepter';


@NgModule({
  declarations: [
    HomeTweetComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InjectTokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: InjectBaseURLInterceptor, multi: true}
  ],
  exports: [
    HomeTweetComponent,
  ]
})
export class SharedModule { }
