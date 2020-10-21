import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommentInputComponent } from './comment-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../comment.service';
import { NoticeService } from '@cores/services';
import { mocked } from 'ts-jest/utils';
import { Observable } from 'rxjs';

const mockedCommentService = mocked(CommentService, true);

jest.mock('../../comment.service');
jest.mock('../../../core/services/notice.service');

describe('CommentInputComponent', () => {
    let component: CommentInputComponent;
    let fixture: ComponentFixture<CommentInputComponent>;
    let commentService: CommentService;

    beforeEach(async(() => {
        mockedCommentService.mockClear();

        TestBed.configureTestingModule({
            declarations: [CommentInputComponent],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule.forRoot(),
            ],
            providers: [
                CommentService,
                NoticeService,
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CommentInputComponent);
        commentService = mockedCommentService.mock.instances[0];
        jest.spyOn(commentService, 'postComment').mockImplementation(() => {
            return new Observable<any>();
        });
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should not call service when comment is empty', () => {
        component.commentContent = '';
        component.onSubmit();
        expect(commentService.postComment).toHaveBeenCalledTimes(0);
    });

    it('should call service when comment is not empty', () => {
        component.commentContent = 'ok';
        component.onSubmit();
        expect(commentService.postComment).toHaveBeenCalledTimes(1);
    });
});
