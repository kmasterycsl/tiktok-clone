import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet, Pagination } from '@tiktok-clone/share';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http: HttpClient) { }

  getTweets(): Observable<Pagination<Tweet>> {
    return this.http.get<Pagination<Tweet>>('tweets');
  }
}
