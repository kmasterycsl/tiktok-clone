import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagDetailPageRoutingModule } from './tag-detail-routing.module';

import { TagDetailPage } from './tag-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [TagDetailPage]
})
export class TagDetailPageModule {}
