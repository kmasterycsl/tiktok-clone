import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NoticeService } from '@services/notice.service';
import { TweetService } from '@services/tweet.service';
import { UploadService } from '@services/upload.service';
import { ROUTE_PROFILE_PAGE } from 'src/app/shared/consts';

@Component({
  selector: 'tiktok-post-tweet',
  templateUrl: './post-tweet.page.html',
  styleUrls: ['./post-tweet.page.scss'],
})
export class PostTweetPage implements OnInit {
  video: File;
  videoBase64: string;
  description: string;
  readonly maxFileSize = 50 * 1000 * 1000;

  constructor(
    private tweetService: TweetService,
    private uploadService: UploadService,
    private noticeService: NoticeService,
    private navController: NavController,
  ) { }

  ngOnInit() {
  }

  pickVideo() {
    this.uploadService.pickVideo().then(file => {
      if (file.size > this.maxFileSize) {
        return this.noticeService.showToast({
          color: 'warning',
          message: 'Please choose file <= ' + this.maxFileSize / (1000 * 1000) + 'MB'
        })
      }
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

    this.tweetService.postTweet(this.description, this.video).subscribe(tweet => {
      this.description = null;
      this.video = null;
      this.videoBase64 = null;
      this.navController.navigateForward([ROUTE_PROFILE_PAGE(tweet.user_id)], {
        queryParams: {
          activeTab: 'public-tweets'
        }
      });
      return this.noticeService.showToast({
        color: 'success',
        message: 'Post tweet successfully!'
      })
    });
  }
}
