import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagWithTweetComponent } from './components/tag-with-tweet/tag-with-tweet.component';


@NgModule({
  imports: [
    CommonModule,
    TagRoutingModule
  ]
})
export class TagModule { }
