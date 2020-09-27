import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagWithTweetComponent } from './tag-with-tweet.component';

describe('TagWithTweetComponent', () => {
  let component: TagWithTweetComponent;
  let fixture: ComponentFixture<TagWithTweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagWithTweetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagWithTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
