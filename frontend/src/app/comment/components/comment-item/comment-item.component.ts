import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, Pagination } from '@tiktok-clone/share';
import { CommentService } from '../../comment.service';

@Component({
    selector: 'tiktok-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
    @Input() comment: Comment;
    @Input() nestedLevel = 1;
    @Output() onReplyTo = new EventEmitter();
    currentResponse: Pagination<Comment> = null;
    showChildren = false;
    hasMoreChildrenComments = false;

    constructor(
        private commentService: CommentService,
    ) {
    }

    ngOnInit() {
        this.comment.children = this.comment.children || [];
    }

    toggleShowChildren() {
        if (this.showChildren === false) {
            this.comment.children = [];
            this.loadChildComments(1);
        }
        this.showChildren = !this.showChildren;
    }

    loadChildComments(page = 1) {
        this.commentService.getChildComments(this.comment.id, page).subscribe(response => {
            this.currentResponse = response;
            this.comment.children = [
                ...this.comment.children || [],
                ...response.items
            ];
            this.hasMoreChildrenComments = +response.meta.currentPage < +response.meta.totalPages;
            return response;
        });
    }

    viewMoreChilren() {
        this.loadChildComments(+this.currentResponse.meta.currentPage + 1);
    }

    replyTo(comment: Comment) {
        this.onReplyTo.next(comment);
    }

    onReplied(newComment: Comment) {
        this.comment.children.push(newComment);
    }

    onLike() {
        this.comment.total_likes++;
        this.comment.is_liked = true;
    }

    onDislike() {
        this.comment.total_likes--;
        this.comment.is_liked = false;
    }

}
