import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommentPage } from './pages/comment.page';

const routes: Routes = [
    {
        path: '',
        component: CommentPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CommentPageRoutingModule {
}
