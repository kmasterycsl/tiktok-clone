import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from '@tiktok-clone/share';

@Component({
  selector: 'tiktok-tweet-grid-item',
  templateUrl: './tweet-grid-item.component.html',
  styleUrls: ['./tweet-grid-item.component.scss'],
})
export class TweetGridItemComponent implements OnInit {
  @Input() tweet: Tweet;

  constructor() { }

  ngOnInit() {}

}
