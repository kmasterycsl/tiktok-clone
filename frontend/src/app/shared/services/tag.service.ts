import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination, Tag, Tweet } from '@tiktok-clone/share';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }


  getTag(tagId: number): Observable<Tag> {
    return this.http.get<Tag>('tags/' + tagId);
  }

  getTags(page: number = 1, query?: string): Observable<Pagination<Tag>> {
    return this.http.get<Pagination<Tag>>('tags', { params: { page: page.toString(), limit: '5', query: query || '' } });
  }

  getTweetsOfTag(tagId: number, page: number = 1): Observable<Pagination<Tweet>> {
    return this.http.get<Pagination<Tweet>>(`tags/${tagId}/tweets`, { params: { page: page.toString() } });
  }
}
