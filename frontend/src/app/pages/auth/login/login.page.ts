import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NoticeService } from '@services/notice.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'tiktok-auth',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = this.fb.group({
    phoneNumber: this.fb.control('+84', [Validators.required]),
    password: ['', [Validators.required]],
  })
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private noticeService: NoticeService,
    private navController: NavController,
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.loginWithPhoneAndPassword(this.form.value.phoneNumber, this.form.value.password).subscribe(() => {
      this.noticeService.showToast({
        message: 'Login success',
        color: 'success'
      });
      this.navController.navigateForward('/tabs/auth/profile')
    });
  }
}
