import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService, LikeService, NoticeService, UserService } from '@cores/services';
import { TagService } from '@tag/tag.service';
import { TweetService } from '@tweet/tweet.service';
import { Pagination, Tag, Tweet } from '@tiktok-clone/share';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, share, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'tiktok-tag-detail',
    templateUrl: './tag-detail.page.html',
    styleUrls: ['./tag-detail.page.scss'],
})
export class TagDetailPage implements OnInit {
    tag: Tag;
    currentResponse: Pagination<Tweet> = null;
    tweets: Tweet[] = [];
    fetching = false;
    refresh$ = new BehaviorSubject(false);
    refreshEvent;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private noticeService: NoticeService,
        private modalController: ModalController,
        private tweetService: TweetService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private likeService: LikeService,
        private navController: NavController,
        private tagService: TagService,
    ) {
    }

    doRefresh(event) {
        this.refreshEvent = event;
        this.refresh$.next(true);
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.fetching = true;
        combineLatest([
            this.activatedRoute.paramMap.pipe(
                map(pm => pm.get('tagId')),
                distinctUntilChanged()
            ),
            this.refresh$,
        ]).pipe(
            tap(([tagId]) => {
                this.currentResponse = null;
                this.tweets = [];
            }),
            switchMap(([tagId]) => this.tagService.getTag(+tagId)),
            tap(tag => this.tag = tag),
            switchMap(tagId => this.loadTweets(1)),
        ).subscribe((tweetResponse) => {
            this.currentResponse = tweetResponse;
            this.tweets = [
                ...this.tweets,
                ...tweetResponse.items
            ];

            if (this.refreshEvent) {
                this.refreshEvent.target.complete();
            }
            this.fetching = false;
        }, e => {
            console.error(e);
            this.fetching = false;
        });
    }

    loadTweets(page: number): Observable<Pagination<Tweet>> {
        return this.tagService
            .getTweetsOfTag(this.tag.id, page)
            .pipe(
                share(),
            );
    }

    doLoadMore(event, segment: string) {
        return this.loadTweets((+this.currentResponse?.meta?.currentPage || 0) + 1).subscribe(response => {
            event.target.complete();
            if (+response.meta.currentPage === +response.meta.totalPages) {
                event.target.disabled = true;
            }
        });
    }

}
