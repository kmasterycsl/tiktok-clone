import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '@tiktok-clone/share';

@Component({
  selector: 'tiktok-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  constructor() { }

  ngOnInit() {}

}
