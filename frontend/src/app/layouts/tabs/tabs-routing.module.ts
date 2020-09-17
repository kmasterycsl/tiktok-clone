import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('../../pages/auth/auth.module').then( m => m.AuthPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../../pages/user/user.module').then( m => m.UserModule)
      },
      {
        path: 'tweet',
        loadChildren: () => import('../../pages/tweet/tweet.module').then( m => m.TweetModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
