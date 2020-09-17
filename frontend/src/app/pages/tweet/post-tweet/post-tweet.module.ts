import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostTweetPageRoutingModule } from './post-tweet-routing.module';

import { PostTweetPage } from './post-tweet.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PostTweetPageRoutingModule
  ],
  declarations: [PostTweetPage]
})
export class PostTweetPageModule {}
