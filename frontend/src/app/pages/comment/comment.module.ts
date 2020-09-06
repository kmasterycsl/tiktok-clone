import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// import { CommentPageRoutingModule } from './comment-routing.module';

import { CommentPage } from './comment.page';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { CommentInputComponent } from './components/comment-input/comment-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // CommentPageRoutingModule
  ],
  declarations: [
    CommentPage,
    CommentItemComponent,
    CommentInputComponent,
  ]
})
export class CommentPageModule {}
