import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { LateralRecyclerViewComponent } from './tienda_bilbao/lateral-recycler-view.component';
import { LateralRecyclerViewTienda1Component } from './tienda_madrid/lateral-recycler-view-tienda1.component';
import { LateralRecyclerViewTienda2Component } from './tienda_barcelona/lateral-recycler-view-tienda2.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    SharedHeaderModule
  ],
  declarations: [
    Tab3Page,
    LateralRecyclerViewComponent,
    LateralRecyclerViewTienda1Component,
    LateralRecyclerViewTienda2Component
  ]
})
export class Tab3PageModule {}