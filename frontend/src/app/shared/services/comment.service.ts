import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet, Pagination } from '@tiktok-clone/share';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getRootComments(tweetId: number, page: number = 1): Observable<Pagination<Comment>> {
    return this.http.get<Pagination<Comment>>(`tweets/${tweetId}/comments`, { params: { page: page.toString() } });
  }
}
