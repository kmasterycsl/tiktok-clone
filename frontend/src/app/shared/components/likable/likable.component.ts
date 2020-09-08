import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LikeService } from '@services/like.service';

@Component({
  selector: 'tiktok-likable',
  templateUrl: './likable.component.html',
  styleUrls: ['./likable.component.scss'],
})
export class LikableComponent implements OnInit {
  @Input() isLiked: boolean = false;
  @Input() totalLikes: number = 0;
  @Input() likableId: number;
  @Input() likableType: string;
  @Output() onLike = new EventEmitter();
  @Output() onDislike = new EventEmitter();

  constructor(
    private likeService: LikeService,

  ) { }

  ngOnInit() { }

  like(event: MouseEvent) {
    event.stopPropagation();
    const $ = this.likableType === 'COMMENT' ?
      this.likeService.likeComment(this.likableId) :
      this.likeService.likeTweet(this.likableId);

    $.subscribe(response => {
      if (this.isLiked) {
        this.onDislike.next();
      } else {
        this.onLike.next();
      }
    }, err => {
      console.error(err);
    });
  }
}
