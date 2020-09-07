import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet, Pagination, Comment } from '@tiktok-clone/share';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  postComment(tweetId: number, content: string, parent_id?: number): Observable<any> {
    return this.http.post<any>(`tweets/${tweetId}/comments`, {
      content,
      parent_id,
    });
  }

  getRootComments(tweetId: number, page: number = 1): Observable<Pagination<Comment>> {
    return this.http.get<Pagination<Comment>>(`tweets/${tweetId}/comments`, { params: { page: page.toString() } });
  }

  getChildComments(commentId: number, page: number = 1): Observable<Pagination<Comment>> {
    return this.http.get<Pagination<Comment>>(`comments/${commentId}/children`, {
      params: {
        page: page.toString(),
        limit: '5'
      }
    });
  }
}
