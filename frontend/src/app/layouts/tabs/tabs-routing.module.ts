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
                loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'tag',
                loadChildren: () => import('../../tag/tag.module').then(m => m.TagModule)
            },
            {
                path: 'auth',
                loadChildren: () => import('../../auth/auth.module').then(m => m.AuthPageModule)
            },
            {
                path: 'user',
                loadChildren: () => import('../../user/user.module').then(m => m.UserModule)
            },
            {
                path: 'tweet',
                loadChildren: () => import('../../tweet/tweet.module').then(m => m.TweetModule)
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
export class TabsPageRoutingModule {
}
