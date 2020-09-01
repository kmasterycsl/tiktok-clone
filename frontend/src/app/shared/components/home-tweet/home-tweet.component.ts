import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
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

  @HostListener('click')
  onClick() {
    this.videoElement.nativeElement.paused ?
      this.videoElement.nativeElement.play() :
      this.videoElement.nativeElement.pause();
  }

  ngOnInit() {
    console.log(this.tweet);
  }

  play() {
    this.videoElement.nativeElement.play();
  }

  pause() {
    this.videoElement.nativeElement.pause();
  }

}
