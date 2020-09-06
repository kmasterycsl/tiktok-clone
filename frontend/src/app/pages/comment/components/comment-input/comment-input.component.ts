import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '@services/comment.service';
import { NoticeService } from '@services/notice.service';

@Component({
  selector: 'tiktok-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss'],
})
export class CommentInputComponent implements OnInit {
  @Input() tweetId: number;
  @Input() parentCommentId?: number
  commentContent: string = "";
  constructor(
    private commentService: CommentService,
    private noticeService: NoticeService,
  ) { }

  ngOnInit(
  ) { }

  onSubmit() {
    if (!this.commentContent.trim()) {
      return;
    }

    this.commentService.postComment(this.tweetId, this.commentContent).subscribe(() => {
      this.noticeService.showToast({
        color: 'success',
        message: 'Commented'
      });
    }, e => {
      console.error(e);
      this.noticeService.showToast({
        color: 'danger',
        message: 'Comment error'
      });
    });
  }

}
