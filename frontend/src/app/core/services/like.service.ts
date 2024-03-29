import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@cores/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LikeService {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {
    }

    like(likableType: string, likableId: number): Observable<any> {
        return this.http.post(`likes`, {
            likableType,
            likableId,
        });
    }

    likeTweet(tweetId: number) {
        return this.like('TWEET', tweetId);
    }

    likeComment(commentId: number) {
        return this.like('COMMENT', commentId);
    }

    likeUser(userId: number) {
        return this.like('USER', userId);
    }
}

