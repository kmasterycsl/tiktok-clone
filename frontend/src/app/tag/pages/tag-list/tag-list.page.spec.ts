import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagListPage } from './tag-list.page';

describe('TagListPage', () => {
    let component: TagListPage;
    let fixture: ComponentFixture<TagListPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TagListPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(TagListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
