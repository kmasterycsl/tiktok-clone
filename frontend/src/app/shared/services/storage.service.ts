import { Injectable } from '@angular/core';

export enum STORAGE_KEYS {
  TOKEN = 'token'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
  ) { }

  put(key: STORAGE_KEYS, value) {
    localStorage.setItem(key, value);
  }

  get(key: STORAGE_KEYS) {
    return localStorage.getItem(key);
  }
}
