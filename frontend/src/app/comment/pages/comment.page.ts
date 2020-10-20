import { Component, Input, OnInit } from '@angular/core';
import { Comment, Pagination, Tweet } from '@tiktok-clone/share';
import { CommentService } from '../comment.service';
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
    fetching = false;
    comments: Comment[] = [];

    constructor(
        private commentService: CommentService,
        private modalCtl: ModalController,
    ) {
    }

    ngOnInit() {
        this.title = this.tweet.comments_count + ' comments';
        this.loadComments(1);
    }

    loadComments(page: number) {
        this.fetching = true;
        return this.commentService.getRootComments(this.tweet.id, page).toPromise().then(response => {
            this.currentResponse = response;
            this.comments = [
                ...this.comments,
                ...response.items
            ];
            return response;
        }).finally(() => {
            this.fetching = false;
        });
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
        setTimeout(() => {
            this.scrollToComment(newComment);
        });
    }

    scrollToComment(newComment: Comment) {
        const ele = document.querySelector(`[data-comment-id="${newComment.id}"]`);
        if (ele) {
            ele.scrollIntoView();
        }
    }

    close() {
        this.modalCtl.dismiss();
    }
}
