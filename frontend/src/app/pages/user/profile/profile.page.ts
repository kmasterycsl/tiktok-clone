import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { NoticeService } from '@services/notice.service';
import { User, Tweet, Pagination } from '@tiktok-clone/share';
import { CommentPage } from '../../comment/comment.page';
import { ModalController } from '@ionic/angular';
import { tap, switchMap, map, share, shareReplay, first } from 'rxjs/operators';
import { TweetService } from '@services/tweet.service';
import { HomeTweetComponent } from 'src/app/shared/components/home-tweet/home-tweet.component';
import { UserService } from '@services/user.service';
import { Observable, combineLatest, Subject, of, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LikeService } from '@services/like.service';

@Component({
  selector: 'tiktok-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  SEGMENTS = {
    PUBLIC_TWEETS: 'public-tweets',
    LIKED_TWEETS: 'liked-tweets',
    PRIVATE_TWEETS: 'private-tweets',
  }
  authUser: User;
  user: User;
  currentResponse: Pagination<Tweet> = null;
  selectedSegment$ = new BehaviorSubject<string>(null);
  tweets: Tweet[] = [];
  fetching = false;
  isRefreshing = false;
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
  ) { }

  doRefresh(event) {
    this.refreshEvent = event;
    this.refresh$.next(true);
  }

  ngOnInit() {
    this.loadSegment();
    this.loadData();
  }

  loadSegment() {
    this.activatedRoute.queryParamMap.subscribe(qs => {
      this.selectedSegment$.next(qs.get('activeTab') || 'public-tweets');
    });
  }

  loadData() {
    this.fetching = true;
    combineLatest([
      this.authService.profile(),
      this.activatedRoute.paramMap,
      this.selectedSegment$,
      this.refresh$,
    ]).pipe(
      tap(([authUser]) => {
        this.authUser = authUser;
      }),
      map(([authUser, paramsMap, segment]) => [+paramsMap.get('userId') || authUser.id, segment]),
      switchMap(([userId, segment]) => combineLatest([this.userService.getUser(+userId), of(segment)])),
      tap(([user, segment]) => {
        this.user = user;
        this.currentResponse = null;
        this.tweets = [];
      }),
      switchMap(([user, segment]) => this.loadTweets(1, segment.toString()))
    ).subscribe((response) => {
      this.currentResponse = response;
      this.tweets = [
        ...this.tweets,
        ...response.items
      ];

      if (this.refreshEvent) {
        this.refreshEvent.target.complete()
      }
      this.fetching = false;
    }, e => {
      console.error(e);
      this.fetching = false;
    });
  }

  toggleFollow() {
    this.likeService.likeUser(this.user.id).subscribe(res => {
      !this.user.is_liked ? this.user.total_followers++ : this.user.total_followers--;
      this.user.is_liked = !this.user.is_liked;
    });
  }

  ionViewWillEnter() {

  }

  loadTweets(page: number, segment: string): Observable<Pagination<Tweet>> {
    let p: Observable<Pagination<Tweet>>;
    switch (segment) {
      case this.SEGMENTS.LIKED_TWEETS:
        p = this.tweetService.getLikedTweetsOfUser(this.user.id, page);
        break;
      case this.SEGMENTS.PUBLIC_TWEETS:
        p = this.tweetService.getPublicTweetsOfUser(this.user.id, page);
        break;
      case this.SEGMENTS.PRIVATE_TWEETS:
        p = this.tweetService.getPrivateTweetsOfUser(this.user.id, page);
        break;
    }

    return p.pipe(
      share(),
    );
  }

  segmentChanged(ev: CustomEvent) {
    this.selectedSegment$.next(ev.detail.value);
  }

  doLoadMore(event, segment: string) {
    return this.loadTweets((+this.currentResponse?.meta?.currentPage || 0) + 1, segment).subscribe(response => {
      event.target.complete();
      if (+response.meta.currentPage === +response.meta.totalPages) {
        event.target.disabled = true;
      }
    });
  }

  async showDetailTweet(tweet: Tweet) {
    const modal = await this.modalController.create({
      component: HomeTweetComponent,
      showBackdrop: false,
      componentProps: {
        tweet,
      }
    });

    modal.present().then(t => {
      console.log(t);
    });
  }

}
