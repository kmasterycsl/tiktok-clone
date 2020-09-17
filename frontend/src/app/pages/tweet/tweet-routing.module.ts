import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostTweetPage } from './post-tweet/post-tweet.page';

const routes: Routes = [
  {
    path: 'post',
    loadChildren: () => import('./post-tweet/post-tweet.module').then(m => m.PostTweetPageModule)
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
export class TweetRoutingModule { }
