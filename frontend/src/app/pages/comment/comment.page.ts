import { Component, OnInit, Input } from '@angular/core';
import { Tweet, Pagination, Comment } from '@tiktok-clone/share';
import { CommentService } from '@services/comment.service';

@Component({
  selector: 'tiktok-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  currentResponse: Pagination<Comment> = null;
  @Input() tweet: Tweet;
  title: string;
  comments: Comment[] = [];
  constructor(
    private commentService: CommentService,
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

  loadData(event) {
    return this.loadComments(+this.currentResponse.meta.currentPage + 1).then(response => {
      event.target.complete();
      if (+response.meta.currentPage === +response.meta.totalPages) {
        event.target.disabled = true;
      }
    });
  }
}
