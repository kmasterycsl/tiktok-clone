import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  tweets: any[];
  constructor(
    private tweetService: TweetService
  ) {
  }

  ngOnInit() {
    this.tweetService.getTweets().subscribe(tweets => this.tweets = tweets)
  }

}
