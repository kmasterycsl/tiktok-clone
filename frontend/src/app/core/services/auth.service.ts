import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { STORAGE_KEYS, StorageService } from './storage.service';
import { tap } from 'rxjs/operators';
import { User } from '@tiktok-clone/share';
import { ILoginResponse } from '@cores/services/user.service';

export interface IProfileResponse extends User {
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser: User;

    constructor(
        private httpClient: HttpClient,
        private storageService: StorageService,
    ) {
    }

    loginWithPhoneAndPassword(phone: number, password: number) {
        return this.httpClient.post<ILoginResponse>('auth/login', {
            phone_number: phone,
            password: password
        }).pipe(
            tap(response => {
                this.storageService.put(STORAGE_KEYS.TOKEN, response.access_token);
                this.fetchUser();
            })
        );
    }

    profile() {
        return this.httpClient.get<IProfileResponse>('auth/profile');
    }

    isLogined() {
        return !!this.storageService.get(STORAGE_KEYS.TOKEN);
    }

    resetAuth() {
        this.storageService.remove(STORAGE_KEYS.TOKEN);
    }

    private fetchUser() {
        this.profile().toPromise().then(user => {
            this.currentUser = user;
        });
    }
}
