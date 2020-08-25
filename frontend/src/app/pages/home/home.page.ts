import { Component, OnInit } from '@angular/core';
import { TweetService } from '@services/tweet.service';
import { Tweet } from '@tiktok-clone/share/entities';

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
  constructor(
    private tweetService: TweetService
  ) {
  }

  ngOnInit() {
    this.tweetService.getTweets().subscribe(tweets => this.tweets = tweets)
  }

}
