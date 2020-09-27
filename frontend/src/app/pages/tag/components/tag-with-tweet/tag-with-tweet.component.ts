import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '@tiktok-clone/share';

@Component({
  selector: 'tiktok-tag-with-tweet',
  templateUrl: './tag-with-tweet.component.html',
  styleUrls: ['./tag-with-tweet.component.scss'],
})
export class TagWithTweetComponent implements OnInit {
  @Input() tag: Tag;
  constructor() { }

  ngOnInit() { }

}
