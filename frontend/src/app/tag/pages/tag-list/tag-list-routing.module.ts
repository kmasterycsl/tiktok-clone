import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TagListPage } from './tag-list.page';

const routes: Routes = [
    {
        path: '',
        component: TagListPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TagListPageRoutingModule {
}
