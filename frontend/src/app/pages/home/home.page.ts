import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TweetService } from '@services/tweet.service';
import { Tweet } from '@tiktok-clone/share/entities';
import { HomeTweetComponent } from 'src/app/shared/components/home-tweet/home-tweet.component';
import { Pagination } from '@tiktok-clone/share';
import { SwiperOptions } from 'swiper';
import { NoticeService } from '@services/notice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  currentResponse: Pagination<Tweet> = null;
  tweets: Tweet[] = [];
  fetching = false;
  slideOpts: SwiperOptions = {
    direction: 'vertical',
  }
  @ViewChildren(HomeTweetComponent) tweetElements: QueryList<HomeTweetComponent>;

  constructor(
    private tweetService: TweetService,
    private noticeService: NoticeService,
  ) {
  }

  ngOnInit() {
    this.loadData(1);
  }

  loadData(page: number) {
    if (this.fetching) return;
    this.fetching = true;
    this.tweetService.getTweets(page).subscribe(response => {
      this.currentResponse = response;
      this.tweets = [
        ...this.tweets,
        ...response.items
      ];
      this.fetching = false;
    })
  }

  ionSlideWillChange(event) {
    const previousIndex = event.target.swiper.previousIndex;
    const willPlayIndex = event.target.swiper.realIndex;
    const currentElement = this.tweetElements.toArray()[previousIndex] as HomeTweetComponent;
    const nextElement = this.tweetElements.toArray()[willPlayIndex] as HomeTweetComponent;
    currentElement.pause();
    nextElement.play();

    if (previousIndex < willPlayIndex && event.target.swiper.progress >= 0.7) {
      const currentPage = +this.currentResponse.meta.currentPage;
      const totalPages = +this.currentResponse.meta.totalPages;
      if (currentPage < totalPages) {
        this.loadData(currentPage + 1);
      } else {
        this.noticeService.showToast({ message: 'No more tweets to get.' });
      }
    }
  }

  trackByFn(index, item) {
    return item.id;
  }

}
