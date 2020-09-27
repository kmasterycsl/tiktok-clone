import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination, Tag } from '@tiktok-clone/share';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }


  getTags(page: number = 1): Observable<Pagination<Tag>> {
    return this.http.get<Pagination<Tag>>('tags', { params: { page: page.toString(), limit: '5' } });
  }
}