import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet } from '@tiktok-clone/share/entities';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http: HttpClient) { }

  getTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>('tweets');
  }
}
