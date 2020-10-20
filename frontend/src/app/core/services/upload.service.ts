import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {
    }

    pickVideo(): Promise<File> {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.hidden = true;
            input.type = 'file';
            input.accept = 'video/mp4';
            document.body.appendChild(input);
            input.click();
            input.onchange = (event: HTMLInputEvent) => {
                return resolve(event.target.files[0]);
            };
        });
    }
}

