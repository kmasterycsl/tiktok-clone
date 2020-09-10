import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet, Pagination } from '@tiktok-clone/share';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http: HttpClient) { }

  getTweets(page: number = 1): Observable<Pagination<Tweet>> {
    return this.http.get<Pagination<Tweet>>('tweets', { params: { page: page.toString() } });
  }

  getLikedTweetsOfUser(userId: number, page: number = 1): Observable<Pagination<Tweet>> {
    return this.http.get<Pagination<Tweet>>(`users/${userId}/liked-tweets`, { params: { page: page.toString() } });
  }

  getPublicTweetsOfUser(userId: number, page: number = 1): Observable<Pagination<Tweet>> {
    return this.http.get<Pagination<Tweet>>(`users/${userId}/public-tweets`, { params: { page: page.toString() } });
  }

  getPrivateTweetsOfUser(userId: number, page: number = 1): Observable<Pagination<Tweet>> {
    return this.http.get<Pagination<Tweet>>(`users/${userId}/private-tweets`, { params: { page: page.toString() } });
  }
}
