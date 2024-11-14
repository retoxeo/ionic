import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { LateralRecyclerViewComponent } from '../tab3/lateral-recycle-view/lateral-recycler-view.component';

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
    LateralRecyclerViewComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab3PageModule {}