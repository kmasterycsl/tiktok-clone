import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikableComponent } from './likable.component';

describe('LikableComponent', () => {
    let component: LikableComponent;
    let fixture: ComponentFixture<LikableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LikableComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(LikableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
