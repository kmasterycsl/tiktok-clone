import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { NoticeService } from '@services/notice.service';
import { User, Tweet, Pagination } from '@tiktok-clone/share';
import { CommentPage } from '../../comment/comment.page';
import { ModalController, NavController } from '@ionic/angular';
import { tap, switchMap, map, share, shareReplay, first, distinctUntilChanged } from 'rxjs/operators';
import { TweetService } from '@services/tweet.service';
import { UserService } from '@services/user.service';
import { Observable, combineLatest, Subject, of, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LikeService } from '@services/like.service';
import { Location } from '@angular/common';
import { ROUTE_FOLLOWER_FOLLOWING_PAGE } from '../../../shared/consts';

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
  targetUser: User;
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
    private navController: NavController,
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
    this.activatedRoute.queryParamMap.pipe(
      map(qs => qs.get('activeTab') || 'public-tweets'),
      distinctUntilChanged(),
    ).subscribe(segment => {
      this.selectedSegment$.next(segment);
    });
  }

  loadData() {
    this.fetching = true;
    combineLatest([
      this.authService.profile(),
      this.activatedRoute.paramMap.pipe(
        map(pm => pm.get('userId')),
        distinctUntilChanged()
      ),
      this.selectedSegment$,
      this.refresh$,
    ]).pipe(
      tap(([authUser, _, segment]) => {
        this.navController.navigateForward([], {
          queryParams: {
            activeTab: segment
          },
          replaceUrl: true
        });
        this.authUser = authUser;
      }),
      map(([authUser, userId, segment]) => [+userId || authUser.id, segment]),
      switchMap(([userId, segment]) => combineLatest([this.userService.getUser(+userId), of(segment)])),
      tap(([user, segment]) => {
        this.targetUser = user;
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
    this.likeService.likeUser(this.targetUser.id).subscribe(res => {
      !this.targetUser.is_liked ? this.targetUser.total_followers++ : this.targetUser.total_followers--;
      this.targetUser.is_liked = !this.targetUser.is_liked;
    });
  }

  ionViewWillEnter() {

  }

  loadTweets(page: number, segment: string): Observable<Pagination<Tweet>> {
    let p: Observable<Pagination<Tweet>>;
    switch (segment) {
      case this.SEGMENTS.LIKED_TWEETS:
        p = this.tweetService.getLikedTweetsOfUser(this.targetUser.id, page);
        break;
      case this.SEGMENTS.PUBLIC_TWEETS:
        p = this.tweetService.getPublicTweetsOfUser(this.targetUser.id, page);
        break;
      case this.SEGMENTS.PRIVATE_TWEETS:
        p = this.tweetService.getPrivateTweetsOfUser(this.targetUser.id, page);
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

  goToFollowing() {
    this.navController.navigateForward(ROUTE_FOLLOWER_FOLLOWING_PAGE(this.targetUser.id), {
      queryParams: {
        activeTab: 'FOLLOWING'
      }
    })
  }

  goToFollower() {
    this.navController.navigateForward(ROUTE_FOLLOWER_FOLLOWING_PAGE(this.targetUser.id), {
      queryParams: {
        activeTab: 'FOLLOWER'
      }
    })
  }

  alertReceivedLikes() {
    const actor = this.authUser.id === this.targetUser.id ? `You've` : `${this.targetUser.name} has`; 
    this.noticeService.showToast({
      color: 'tertiary',
      message: `${actor} received total ${this.targetUser.total_received_tweet_likes} likes from your tweets!`
    })
  }

}
