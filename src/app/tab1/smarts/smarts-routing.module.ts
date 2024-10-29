import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmartsPage } from './smarts.page';

const routes: Routes = [
  {
    path: '',
    component: SmartsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartsPageRoutingModule {}
