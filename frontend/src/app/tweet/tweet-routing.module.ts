import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'post',
        loadChildren: () => import('./pages/post-tweet/post-tweet.module').then(m => m.PostTweetPageModule)
    },
    {
        path: '',
        redirectTo: 'post'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TweetRoutingModule {
}
