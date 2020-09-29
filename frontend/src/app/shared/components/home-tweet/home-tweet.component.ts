import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { Tweet } from '@tiktok-clone/share/entities';
import { LikeService } from '@services/like.service';
import { ModalController, NavController } from '@ionic/angular';
import { CommentPage } from 'src/app/pages/comment/comment.page';

@Component({
  selector: 'tiktok-home-tweet',
  templateUrl: './home-tweet.component.html',
  styleUrls: ['./home-tweet.component.scss'],
})
export class HomeTweetComponent implements OnInit {
  @Input() tweet: Tweet;
  @Input() autoPlay: boolean = false;
  @ViewChild('video') videoElement: ElementRef<HTMLVideoElement>;

  constructor(
    private navCtl: NavController,
    private modalController: ModalController,
  ) { }

  @HostListener('click')
  onClick() {
    this.videoElement.nativeElement.paused ?
      this.videoElement.nativeElement.play() :
      this.videoElement.nativeElement.pause();
  }

  ngOnInit() {
  }

  play() {
    this.videoElement.nativeElement.play();
  }

  pause() {
    this.videoElement.nativeElement.pause();
  }

  onClickComment(event: MouseEvent) {
    event.stopPropagation();
    this.showCommentPage(this.tweet);
  }

  onLike() {
    this.tweet.total_likes++;
    this.tweet.is_liked = true;
  }

  onDislike() {
    this.tweet.total_likes--;
    this.tweet.is_liked = false;
  }

  goToAuthorProfile() {
    this.navCtl.navigateForward(['/tabs/user/profile/' + this.tweet.user_id], {
      queryParams: {
        activeTab: 'public-tweets'
      }
    });
  }

  async showCommentPage(tweet: Tweet) {
    const modal = await this.modalController.create({
      component: CommentPage,
      cssClass: 'chat-box',
      showBackdrop: false,
      componentProps: {
        tweet,
      }
    });

    modal.present();
  }


}
