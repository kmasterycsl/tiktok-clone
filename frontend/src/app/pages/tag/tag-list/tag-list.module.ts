import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagListPageRoutingModule } from './tag-list-routing.module';

import { TagListPage } from './tag-list.page';
import { TagWithTweetComponent } from '../components/tag-with-tweet/tag-with-tweet.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagListPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    TagListPage,
    TagWithTweetComponent,
  ]
})
export class TagListPageModule {}
