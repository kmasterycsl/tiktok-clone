import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTextarea, NavController } from '@ionic/angular';
import { NoticeService } from '@cores/services/notice.service';
import { TagService } from '../../../tag/tag.service';
import { TweetService } from '../../tweet.service';
import { UploadService } from '../../../core/services/upload.service';
import { Tag } from '@tiktok-clone/share';
import { ROUTE_PROFILE_PAGE } from 'src/app/shared/consts';


@Component({
    selector: 'tiktok-post-tweet',
    templateUrl: './post-tweet.page.html',
    styleUrls: ['./post-tweet.page.scss'],
})
export class PostTweetPage implements OnInit {
    video: File;
    videoBase64: string;
    description: string;
    readonly maxFileSize = 50 * 1000 * 1000;
    suggestedTags: Tag[] = [];
    currentQuery: string = '';

    @ViewChild(IonTextarea) textarea: IonTextarea;

    constructor(
        private tweetService: TweetService,
        private tagService: TagService,
        private uploadService: UploadService,
        private noticeService: NoticeService,
        private navController: NavController,
    ) {
    }

    ngOnInit() {
    }

    pickVideo() {
        this.uploadService.pickVideo().then(file => {
            if (file.size > this.maxFileSize) {
                return this.noticeService.showToast({
                    color: 'warning',
                    message: 'Please choose file <= ' + this.maxFileSize / (1000 * 1000) + 'MB'
                });
            }
            this.video = file;

            const reader = new FileReader();
            reader.onload = e => {
                this.videoBase64 = e.target.result as string;
            };
            reader.readAsDataURL(file);
        });
    }

    onTweetDescriptionChange(event) {
        const shouldShowTagRegex = new RegExp(/\.*#([a-zA-Z0-9]*)$/g);
        const result = shouldShowTagRegex.exec(event);
        if (result?.[1]) {
            this.currentQuery = result[1];
            this.loadSuggestedTags();
        } else {
            this.currentQuery = '';
            this.suggestedTags = [];
        }
    }

    async selectTag(tag: Tag) {
        const inputEle = await this.textarea.getInputElement();
        console.log(inputEle.selectionStart);
        const textToFind = `#${this.currentQuery}`;
        this.description = this.description.replace(textToFind, `#${tag.slug} `);
        this.textarea.setFocus();
        this.suggestedTags = [];
        this.currentQuery = '';
    }

    loadSuggestedTags() {
        this.tagService.getTags(1, 10, this.currentQuery).toPromise().then(response => {
            this.suggestedTags = response.items;
        });
    }

    postTweet(status: string) {
        if (!this.description) {
            return this.noticeService.showToast({
                color: 'warning',
                message: 'Please input description'
            });
        }
        if (!this.video) {
            return this.noticeService.showToast({
                color: 'warning',
                message: 'Please choose your video'
            });
        }

        this.tweetService.postTweet(this.description, this.video, status).subscribe(tweet => {
            this.description = null;
            this.video = null;
            this.videoBase64 = null;
            if (status === 'DRAFT') {
                this.navController.navigateForward([ROUTE_PROFILE_PAGE(tweet.user_id)], {
                    queryParams: {
                        activeTab: 'private-tweets'
                    }
                });
            } else if (status === 'PUBLIC') {
                this.navController.navigateForward([ROUTE_PROFILE_PAGE(tweet.user_id)], {
                    queryParams: {
                        activeTab: 'public-tweets'
                    }
                });
            }
            return this.noticeService.showToast({
                color: 'success',
                message: 'Post tweet successfully!'
            });
        });
    }
}
