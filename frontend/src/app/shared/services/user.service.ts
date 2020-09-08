import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService, STORAGE_KEYS } from '@services/storage.service';
import { tap } from 'rxjs/operators';
import { User } from '@tiktok-clone/share';
import { Observable } from 'rxjs';

export interface ILoginResponse {
  access_token: string;
}

export interface IProfileResponse extends User {
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`users/${userId}`);
  }
}
