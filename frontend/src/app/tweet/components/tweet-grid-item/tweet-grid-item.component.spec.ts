import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TweetGridItemComponent } from './tweet-grid-item.component';

describe('TweetGridItemComponent', () => {
    let component: TweetGridItemComponent;
    let fixture: ComponentFixture<TweetGridItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TweetGridItemComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(TweetGridItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
