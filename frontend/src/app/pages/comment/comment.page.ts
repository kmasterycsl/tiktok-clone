import { Component, OnInit, Input } from '@angular/core';
import { Tweet, Pagination, Comment } from '@tiktok-clone/share';
import { CommentService } from '@services/comment.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'tiktok-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  currentResponse: Pagination<Comment> = null;
  @Input() tweet: Tweet;
  title: string;
  replyToComment: Comment = null;
  comments: Comment[] = [];
  constructor(
    private commentService: CommentService,
    private modalCtl: ModalController,
  ) { }

  ngOnInit() {
    this.title = this.tweet.comments_count + ' comments';
    this.loadComments(1);
  }

  loadComments(page: number) {
    return this.commentService.getRootComments(this.tweet.id, page).toPromise().then(response => {
      this.currentResponse = response;
      this.comments = [
        ...this.comments,
        ...response.items
      ];
      return response;
    })
  }

  loadMore(event) {
    return this.loadComments(+this.currentResponse.meta.currentPage + 1).then(response => {
      event.target.complete();
      if (+response.meta.currentPage === +response.meta.totalPages) {
        event.target.disabled = true;
      }
    });
  }

  onReply(comment: Comment) {
    this.replyToComment = comment;
  }

  onReplySuccess(newComment: Comment) {
    if (this.replyToComment) {
      this.replyToComment.children_count++;
      this.replyToComment.children = [
        ...this.replyToComment.children,
        newComment
      ];
    } else {
      this.tweet.comments_count++;
      this.comments.push(newComment);
    }
    this.scrollToComment(newComment);
  }

  scrollToComment(newComment: Comment) {

  }

  close() {
    this.modalCtl.dismiss();
  }
}
