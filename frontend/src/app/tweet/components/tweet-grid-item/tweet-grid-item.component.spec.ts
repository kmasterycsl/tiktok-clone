import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TweetGridItemComponent } from '@tweet/components/tweet-grid-item/tweet-grid-item.component';
import { Tweet } from '@tiktok-clone/share';
import { PartialDeep } from 'type-fest';

describe('TweetGridItemComponent', () => {
    let component: TweetGridItemComponent;
    let fixture: ComponentFixture<TweetGridItemComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [TweetGridItemComponent],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
            ],
            providers: [
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TweetGridItemComponent);

        component = fixture.componentInstance;
    }));

    it('should show gif image if has gif image', () => {
        const fakeTweet: PartialDeep<Tweet> = {
            video: {
                file_url: 'someurl',
                thumbnail: {
                    file_url: 'someurl2',
                }
            },

        }
        component.tweet = fakeTweet as Tweet;

        fixture.detectChanges();

        const element: HTMLDivElement = fixture.nativeElement;

        expect(element.innerHTML).toContain('img');
    });

    it('should show video if has no gif image', () => {
        const fakeTweet: PartialDeep<Tweet> = {
            video: {
                file_url: 'someurl',
            },

        }
        component.tweet = fakeTweet as Tweet;

        fixture.detectChanges();

        const element: HTMLDivElement = fixture.nativeElement;

        expect(element.innerHTML).toContain('video');
    });
});
