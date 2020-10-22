import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommentInputComponent } from './comment-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../comment.service';
import { NoticeService } from '@cores/services';
import { mocked } from 'ts-jest/utils';
import { from } from 'rxjs';

const mockedCommentService = mocked(CommentService, true);
const mockedNoticeService = mocked(NoticeService, true);

jest.mock('../../comment.service');
jest.mock('../../../core/services/notice.service');

describe('CommentInputComponent', () => {
    let component: CommentInputComponent;
    let fixture: ComponentFixture<CommentInputComponent>;
    let commentService: CommentService;
    let noticeService: NoticeService;

    beforeEach(async(() => {
        mockedCommentService.mockClear();
        mockedNoticeService.mockClear();
        jest.spyOn(console, 'error').mockImplementation(() => undefined);

        TestBed.configureTestingModule({
            declarations: [CommentInputComponent],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
            ],
            providers: [
                CommentService,
                NoticeService,
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CommentInputComponent);
        commentService = mockedCommentService.mock.instances[0];
        noticeService = mockedNoticeService.mock.instances[0];

        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should not call service when comment is empty', () => {
        component.commentContent = '';
        component.onSubmit();
        expect(commentService.postComment).toHaveBeenCalledTimes(0);
    });

    it('should comment successfully', async () => {
        const newComment = {};
        component.commentContent = 'ok';
        jest.spyOn(commentService, 'postComment').mockReturnValue(from(Promise.resolve(newComment)));
        jest.spyOn(component.onReplySuccess, 'next');
        await component.onSubmit();

        // Call service
        expect(commentService.postComment).toHaveBeenCalledTimes(1);

        // Alert
        expect(noticeService.showToast).toHaveBeenCalledWith(expect.objectContaining({
            color: 'success',
        }));

        // Reset content
        expect(component.commentContent).toEqual('');

        // Emit event
        expect(component.onReplySuccess.next).toHaveBeenCalledWith(newComment);
    });

    it('should not comment successfully', async () => {
        component.commentContent = 'ok';
        jest.spyOn(commentService, 'postComment').mockReturnValue(from(Promise.reject()));
        jest.spyOn(component.onReplySuccess, 'next');
        await component.onSubmit();

        // Call service
        expect(commentService.postComment).toHaveBeenCalledTimes(1);

        // Alert
        expect(noticeService.showToast).toHaveBeenCalledWith(expect.objectContaining({
            color: 'danger',
        }));

        // Do not reset content
        expect(component.commentContent).toEqual('ok');

        // Do not emit event
        expect(component.onReplySuccess.next).toHaveBeenCalledTimes(0);
    });

});
