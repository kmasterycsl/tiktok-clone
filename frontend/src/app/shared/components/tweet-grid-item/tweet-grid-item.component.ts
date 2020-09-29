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

  ngOnInit() {}

  async showDetailTweet(tweet: Tweet) {
    const modal = await this.modalController.create({
      component: HomeTweetComponent,
      showBackdrop: false,
      componentProps: {
        tweet,
        autoPlay: true,
      }
    });

    modal.present().then(t => {
      console.log(t);
    });
  }

}
