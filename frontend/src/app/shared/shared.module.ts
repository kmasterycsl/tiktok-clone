import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTweetComponent } from './components/home-tweet/home-tweet.component';
import { InjectBaseURLInterceptor } from './interceptors/InjectBaseURL.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './interceptors/ErrorHandler.intercepter';
import { InjectTokenInterceptor } from './interceptors/InjectToken.intercepter';
import { IonicModule } from '@ionic/angular';
import { LikableComponent } from './components/likable/likable.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TweetGridItemComponent } from './components/tweet-grid-item/tweet-grid-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CollapseTextComponent } from './components/collapse-text/collapse-text.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';


@NgModule({
  declarations: [
    HomeTweetComponent,
    LikableComponent,
    TimeAgoPipe,
    TweetGridItemComponent,
    SpinnerComponent,
    CollapseTextComponent,
    UserListItemComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InjectTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InjectBaseURLInterceptor, multi: true }
  ],
  exports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeTweetComponent,
    LikableComponent,
    TimeAgoPipe,
    TweetGridItemComponent,
    SpinnerComponent,
    CollapseTextComponent,
    UserListItemComponent,
  ]
})
export class SharedModule { }
