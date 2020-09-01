import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NoticeService } from '@services/notice.service';
import { User } from '@tiktok-clone/share';

@Component({
  selector: 'tiktok-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private noticeService: NoticeService,
  ) { }

  ngOnInit() {
    console.log(this.authService.profile);
    this.authService.profile().subscribe(user => {
      this.user = user;
    });
  }


}