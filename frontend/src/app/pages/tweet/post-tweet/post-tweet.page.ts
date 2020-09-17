import { Component, OnInit } from '@angular/core';
import { NoticeService } from '@services/notice.service';
import { TweetService } from '@services/tweet.service';
import { UploadService } from '@services/upload.service';

@Component({
  selector: 'tiktok-post-tweet',
  templateUrl: './post-tweet.page.html',
  styleUrls: ['./post-tweet.page.scss'],
})
export class PostTweetPage implements OnInit {
  video: File;
  videoBase64: string;
  description: string;

  constructor(
    private tweetService: TweetService,
    private uploadService: UploadService,
    private noticeService: NoticeService,
  ) { }

  ngOnInit() {
  }

  pickVideo() {
    this.uploadService.pickVideo().then(file => {
      this.video = file;

      const reader = new FileReader();
      reader.onload = e => {
        this.videoBase64 = e.target.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  postTweet() {
    if (!this.description) {
      return this.noticeService.showToast({
        color: 'warning',
        message: 'Please input description'
      })
    }
    if (!this.video) {
      return this.noticeService.showToast({
        color: 'warning',
        message: 'Please choose your video'
      })
    }

    this.tweetService.postTweet(this.description, this.video).subscribe();
  }
}
