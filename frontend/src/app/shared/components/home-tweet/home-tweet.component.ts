import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Tweet } from '@tiktok-clone/share/entities';

@Component({
  selector: 'tiktok-home-tweet',
  templateUrl: './home-tweet.component.html',
  styleUrls: ['./home-tweet.component.scss'],
})
export class HomeTweetComponent implements OnInit {
  @Input() tweet: Tweet;
  @Input() autoPlay: boolean = false;
  @ViewChild('video') videoElement: ElementRef<HTMLVideoElement>;

  constructor() { }

  ngOnInit() { }

  play() {
    this.videoElement.nativeElement.play();
  }

  pause() {
    this.videoElement.nativeElement.pause();
  }

}
