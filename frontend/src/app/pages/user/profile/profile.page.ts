import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { NoticeService } from '@services/notice.service';
import { User, Tweet, Pagination } from '@tiktok-clone/share';
import { CommentPage } from '../../comment/comment.page';
import { ModalController } from '@ionic/angular';
import { tap, switchMap } from 'rxjs/operators';
import { TweetService } from '@services/tweet.service';
import { HomeTweetComponent } from 'src/app/shared/components/home-tweet/home-tweet.component';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

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
  selectedSegment = 'liked-tweets';
  tweets: Tweet[] = [];
  fetching = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private noticeService: NoticeService,
    private modalController: ModalController,
    private tweetService: TweetService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.authService.profile().pipe(
      switchMap(user => this.userService.getUser(user.id)),
      tap(user => this.user = user)
    ).subscribe(() => {
      this.loadData(1);
    });
  }

  ionViewWillEnter() {

  }

  async loadData(page: number) {
    if (this.fetching) return;
    this.fetching = true;
    let p: Observable<Pagination<Tweet>>;
    switch (this.selectedSegment) {
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
    this.selectedSegment = ev.detail.value;
    this.currentResponse = null;
    this.tweets = [];
    this.loadData(1);
  }

  loadMore(event) {
    return this.loadData((+this.currentResponse?.meta?.currentPage || 0) + 1).then(response => {
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
