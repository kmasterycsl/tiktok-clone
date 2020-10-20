import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TagDetailPage } from './tag-detail.page';

const routes: Routes = [
    {
        path: ':tagId',
        component: TagDetailPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TagDetailPageRoutingModule {
}
