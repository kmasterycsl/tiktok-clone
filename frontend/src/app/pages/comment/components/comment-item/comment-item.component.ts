import { Component, OnInit, Input } from '@angular/core';
import { Comment, Pagination } from '@tiktok-clone/share';
import { CommentService } from '@services/comment.service';

@Component({
  selector: 'tiktok-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  @Input() nestedLevel = 1;
  currentResponse: Pagination<Comment> = null;
  childrenComments: Comment[] = [];
  showChildren = false;
  hasMoreChildrenComments = false;
  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit() { }

  toggleShowChildren() {
    if (this.showChildren === false && this.childrenComments.length === 0) {
      this.loadChildComments(1);
    }
    this.showChildren = !this.showChildren;
  }

  loadChildComments(page = 1) {
    this.commentService.getChildComments(this.comment.id, page).subscribe(response => {
      this.currentResponse = response;
      this.childrenComments = [
        ...this.childrenComments,
        ...response.items
      ];
      this.hasMoreChildrenComments = +response.meta.currentPage < +response.meta.totalPages;
      return response;
    });
  }

  viewMoreChilren() {
    this.loadChildComments(+this.currentResponse.meta.currentPage + 1)
  }

}
