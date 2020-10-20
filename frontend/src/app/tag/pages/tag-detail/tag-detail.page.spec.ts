import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagDetailPage } from './tag-detail.page';

describe('TagDetailPage', () => {
    let component: TagDetailPage;
    let fixture: ComponentFixture<TagDetailPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TagDetailPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(TagDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
