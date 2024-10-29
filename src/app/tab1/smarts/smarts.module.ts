import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmartsPageRoutingModule } from './smarts-routing.module';

import { SmartsPage } from './smarts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmartsPageRoutingModule
  ],
  declarations: [SmartsPage]
})
export class SmartsPageModule {}
