import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommentService } from '@services/comment.service';
import { NoticeService } from '@services/notice.service';
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
  commentContent: string = "";
  placeholder: string = "";
  constructor(
    private commentService: CommentService,
    private noticeService: NoticeService,
  ) { }

  ngOnInit(
  ) { }

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

    this.commentService.postComment(this.tweetId, this.commentContent, this.parentComment?.id).subscribe((newComment: Comment) => {
      this.onReplySuccess.next(newComment);
      this.noticeService.showToast({
        color: 'success',
        message: 'Commented'
      });
      this.commentContent = '';
    }, e => {
      console.error(e);
      this.noticeService.showToast({
        color: 'danger',
        message: 'Comment error'
      });
    });
  }

}
