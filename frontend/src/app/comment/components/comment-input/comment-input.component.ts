import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommentService } from '../../comment.service';
import { NoticeService } from '@cores/services/notice.service';
import { Comment } from '@tiktok-clone/share';

@Component({
    selector: 'tiktok-comment-input',
    templateUrl: './comment-input.component.html',
    styleUrls: ['./comment-input.component.scss'],
})
export class CommentInputComponent implements OnInit, OnChanges {
    @Input() tweetId: number;
    @Input() parentComment?: Comment;
    @Output() onReplySuccess = new EventEmitter;

    commentContent: string = '';
    placeholder: string = '';

    constructor(
        private commentService: CommentService,
        private noticeService: NoticeService,
    ) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.parentComment.currentValue !== changes.parentComment.previousValue) {
            const comment = changes.parentComment.currentValue as Comment;
            this.placeholder = comment ? `Reply to ${comment.user.name}` : 'Add a comment...';
        }
    }

    onSubmit() {
        if (!this.commentContent.trim()) {
            return;
        }

        return this.commentService
            .postComment(this.tweetId, this.commentContent, this.parentComment?.id)
            .toPromise()
            .then((newComment: Comment) => {
                this.onReplySuccess.next(newComment);
                this.noticeService.showToast({
                    color: 'success',
                    message: 'Commented'
                });
                this.commentContent = '';
            })
            .catch(e => {
                console.error(e);
                this.noticeService.showToast({
                    color: 'danger',
                    message: 'Comment error'
                });
            });
    }

}
