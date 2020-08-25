import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TweetService } from '@services/tweet.service';
import { Tweet } from '@tiktok-clone/share/entities';
import { HomeTweetComponent } from 'src/app/shared/components/home-tweet/home-tweet.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  tweets: Tweet[];
  slideOpts = {
    direction: 'vertical',
  }
  @ViewChildren(HomeTweetComponent) tweetElements: QueryList<HomeTweetComponent>;

  constructor(
    private tweetService: TweetService
  ) {
  }

  ngOnInit() {
    this.tweetService.getTweets().subscribe(tweets => {
      this.tweets = tweets;
    })
  }

  ionSlideWillChange(event) {
    // console.log(event.target.swiper);
    const previousIndex = event.target.swiper.previousIndex;
    const willPlayIndex = event.target.swiper.realIndex;
    const currentElement = this.tweetElements.toArray()[previousIndex] as HomeTweetComponent;
    const nextElement = this.tweetElements.toArray()[willPlayIndex] as HomeTweetComponent;
    currentElement.pause();
    nextElement.play();
  }

}
