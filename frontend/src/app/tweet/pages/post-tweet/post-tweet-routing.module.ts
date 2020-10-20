import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostTweetPage } from './post-tweet.page';

const routes: Routes = [
    {
        path: '',
        component: PostTweetPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostTweetPageRoutingModule {
}
