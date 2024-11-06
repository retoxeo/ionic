import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LateralRecyclerViewTienda1Component } from './lateral-recycler-view-tienda1.component';

describe('LateralRecyclerViewTienda1Component', () => {
  let component: LateralRecyclerViewTienda1Component;
  let fixture: ComponentFixture<LateralRecyclerViewTienda1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LateralRecyclerViewTienda1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LateralRecyclerViewTienda1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
