import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NoticeService } from '@cores/services/notice.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'tiktok-auth',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    form = this.fb.group({
        phoneNumber: this.fb.control('+84', [Validators.required]),
        password: ['', [Validators.required]],
    });
    backUrl: string;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private noticeService: NoticeService,
        private navController: NavController,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.backUrl = this.activatedRoute.snapshot.paramMap.get('back') || '/tabs/auth/profile';
    }

    login() {
        this.authService.loginWithPhoneAndPassword(this.form.value.phoneNumber, this.form.value.password).subscribe(() => {
            this.noticeService.showToast({
                message: 'Login success',
                color: 'success'
            });
            this.navController.navigateRoot(this.backUrl);
        });
    }
}
