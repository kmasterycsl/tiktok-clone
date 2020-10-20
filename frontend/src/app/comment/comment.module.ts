import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CommentPage } from './pages/comment.page';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { CommentInputComponent } from './components/comment-input/comment-input.component';
import { SharedModule } from 'src/app/shared/shared.module';

// import { CommentPageRoutingModule } from './comment-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        // CommentPageRoutingModule
    ],
    declarations: [
        CommentPage,
        CommentItemComponent,
        CommentInputComponent,
    ]
})
export class CommentPageModule {
}
