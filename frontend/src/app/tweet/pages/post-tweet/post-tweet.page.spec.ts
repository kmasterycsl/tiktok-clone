import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostTweetPage } from './post-tweet.page';

describe('PostTweetPage', () => {
    let component: PostTweetPage;
    let fixture: ComponentFixture<PostTweetPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostTweetPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(PostTweetPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
