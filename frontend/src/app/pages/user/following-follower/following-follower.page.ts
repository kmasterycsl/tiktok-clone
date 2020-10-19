import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { NoticeService } from '@services/notice.service';
import { User, Tweet, Pagination } from '@tiktok-clone/share';
import { CommentPage } from '../../comment/comment.page';
import { ModalController, NavController } from '@ionic/angular';
import { tap, switchMap, map, share, shareReplay, first, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { TweetService } from '@services/tweet.service';
import { UserService } from '@services/user.service';
import { Observable, combineLatest, Subject, of, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LikeService } from '@services/like.service';
import { Location } from '@angular/common';
import { ROUTE_PROFILE_PAGE } from '../../../shared/consts';

@Component({
  selector: 'tiktok-profile',
  templateUrl: './following-follower.page.html',
  styleUrls: ['./following-follower.page.scss'],
})
export class FollowingFollowerPage implements OnInit {
  SEGMENTS = {
    FOLLOWING: 'FOLLOWING',
    FOLLOWER: 'FOLLOWER',
  }
  counts = {
    FOLLOWING: 0,
    FOLLOWER: 0,
  }
  currentResponse: Pagination<User> = null;
  selectedSegment$ = new BehaviorSubject<string>(null);
  users: User[] = [];
  authUser: User;
  userId: number;
  fetching = false;
  isRefreshing = false;
  refresh$ = new BehaviorSubject(false);
  refreshEvent;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private likeService: LikeService,
    private navController: NavController,
    private authService: AuthService,
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
      map(qs => qs.get('activeTab') || 'FOLLOWER'),
      distinctUntilChanged(),
    ).subscribe(segment => {
      this.selectedSegment$.next(segment);
    });
  }

  loadData() {
    this.fetching = true;
    combineLatest([
      this.activatedRoute.paramMap.pipe(
        map(pm => +pm.get('userId')),
        distinctUntilChanged()
      ),
      this.selectedSegment$,
      this.authService.profile(),
      this.refresh$,
    ]).pipe(
      tap(([userId, segment, authUser]) => {
        this.userId = userId;
        this.authUser = authUser;
        this.currentResponse = null;
        this.users = [];
        this.navController.navigateForward([], {
          queryParams: {
            activeTab: segment
          }
        });
      }),
      switchMap(([userId, segment]) => this.loadUsers(1, segment.toString())
        .pipe(
          withLatestFrom(
            of(segment)
          )
        )
      )
    ).subscribe(([response, segment]) => {
      if (segment === this.SEGMENTS.FOLLOWER) {
        this.counts.FOLLOWER = response.meta.totalItems;
      } else if (segment === this.SEGMENTS.FOLLOWING) {
        this.counts.FOLLOWING = response.meta.totalItems;
      }
      this.currentResponse = response;
      this.users = response.items;

      if (this.refreshEvent) {
        this.refreshEvent.target.complete()
      }
      this.fetching = false;
    }, e => {
      console.error(e);
      this.fetching = false;
    });
  }

  toggleFollow(event, user: User) {
    event.stopPropagation();
    this.likeService.likeUser(user.id).subscribe(res => {
      user.is_liked = !user.is_liked
    });
  }

  goToProfile(user: User) {
    this.navController.navigateForward(ROUTE_PROFILE_PAGE(user.id));
  }

  ionViewWillEnter() {

  }

  loadUsers(page: number, segment: string): Observable<Pagination<User>> {
    let p: Observable<Pagination<User>>;
    switch (segment) {
      case this.SEGMENTS.FOLLOWER:
        p = this.userService.getFollowers(this.userId, page);
        break;
      case this.SEGMENTS.FOLLOWING:
        p = this.userService.getFollowings(this.userId, page);
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
    return this.loadUsers((+this.currentResponse?.meta?.currentPage || 0) + 1, segment).subscribe(response => {
      event.target.complete();
      if (+response.meta.currentPage === +response.meta.totalPages) {
        event.target.disabled = true;
      }
    });
  }

}
