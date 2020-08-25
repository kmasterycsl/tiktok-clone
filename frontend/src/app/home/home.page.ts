import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  tweets: any;
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
