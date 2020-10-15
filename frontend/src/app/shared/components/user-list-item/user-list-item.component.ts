import { Component, Input, OnInit } from '@angular/core';
import { User } from '@tiktok-clone/share';

@Component({
  selector: 'tiktok-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {}

}
