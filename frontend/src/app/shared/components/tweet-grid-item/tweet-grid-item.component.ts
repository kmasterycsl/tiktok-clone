import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tweet } from '@tiktok-clone/share';
import { HomeTweetComponent } from '../home-tweet/home-tweet.component';

@Component({
  selector: 'tiktok-tweet-grid-item',
  templateUrl: './tweet-grid-item.component.html',
  styleUrls: ['./tweet-grid-item.component.scss'],
})
export class TweetGridItemComponent implements OnInit {
  @Input() tweet: Tweet;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  async showDetailTweet($event) {
    $event.stopImmediatePropagation();

    const modal = await this.modalController.create({
      component: HomeTweetComponent,
      showBackdrop: false,
      swipeToClose: true,
      mode: 'ios',
      componentProps: {
        tweet: this.tweet,
        autoPlay: true,
        showBackBtn: true,
      }
    });

    modal.present().then(t => {
      console.log(t);
    });

    modal.onWillDismiss().then(({ data }) => {
      if (data?.back) {
        this.modalController.dismiss();
      }
    })
  }

}
