import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination, User } from '@tiktok-clone/share';
import { Observable } from 'rxjs';

export interface ILoginResponse {
    access_token: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getUser(userId: number): Observable<User> {
        return this.httpClient.get<User>(`users/${userId}`);
    }

    getFollowers(userId: number, page): Observable<Pagination<User>> {
        return this.httpClient.get<Pagination<User>>(`users/${userId}/followers`, {params: {page}});
    }

    getFollowings(userId: number, page): Observable<Pagination<User>> {
        return this.httpClient.get<Pagination<User>>(`users/${userId}/followings`, {params: {page}});
    }
}
