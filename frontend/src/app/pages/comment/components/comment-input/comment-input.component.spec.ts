import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommentInputComponent } from './comment-input.component';

describe('CommentInputComponent', () => {
  let component: CommentInputComponent;
  let fixture: ComponentFixture<CommentInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
