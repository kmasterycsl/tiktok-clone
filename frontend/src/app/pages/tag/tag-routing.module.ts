import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tag-list/tag-list.module').then(m => m.TagListPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./tag-detail/tag-detail.module').then( m => m.TagDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
