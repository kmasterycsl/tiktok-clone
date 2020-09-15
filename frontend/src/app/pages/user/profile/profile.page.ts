import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { NoticeService } from '@services/notice.service';
import { User, Tweet, Pagination } from '@tiktok-clone/share';
import { CommentPage } from '../../comment/comment.page';
import { ModalController } from '@ionic/angular';
import { tap, switchMap, map } from 'rxjs/operators';
import { TweetService } from '@services/tweet.service';
import { HomeTweetComponent } from 'src/app/shared/components/home-tweet/home-tweet.component';
import { UserService } from '@services/user.service';
import { Observable, combineLatest, Subject, of, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  user: User;
  currentResponse: Pagination<Tweet> = null;
  selectedSegment$ = new BehaviorSubject<string>(null);
  tweets: Tweet[] = [];
  fetching = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private noticeService: NoticeService,
    private modalController: ModalController,
    private tweetService: TweetService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(qs => {
      this.selectedSegment$.next(qs.get('activeTab') || 'public-tweets');
    });

    combineLatest([
      this.authService.profile(),
      this.activatedRoute.paramMap,
      this.selectedSegment$,
    ]).pipe(
      map(([authUser, paramsMap, segment]) => [+paramsMap.get('userId') || authUser.id, segment]),
      switchMap(([userId, segment]) => combineLatest([this.userService.getUser(+userId), of(segment)])),
      tap(([user, segment]) => {
        this.user = user
      })
    ).subscribe(([user, segment]) => {
      this.currentResponse = null;
      this.tweets = [];
      this.loadData(1, segment.toString());
    });
  }

  ionViewWillEnter() {

  }

  async loadData(page: number, segment: string) {
    if (this.fetching) return;

    this.fetching = true;
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

    const response = await p.toPromise();

    this.currentResponse = response;
    this.tweets = [
      ...this.tweets,
      ...response.items
    ];
    this.fetching = false;;

    return response;
  }

  segmentChanged(ev: CustomEvent) {
    this.selectedSegment$.next(ev.detail.value);
  }

  loadMore(event, segment: string) {
    return this.loadData((+this.currentResponse?.meta?.currentPage || 0) + 1, segment).then(response => {
      event.target.complete();
      // if (+response.meta.currentPage === +response.meta.totalPages) {
      //   // event.target.disabled = true;
      // }
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
