import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LateralRecyclerViewTienda2Component } from './lateral-recycler-view-tienda2.component';

describe('LateralRecyclerViewTienda2Component', () => {
  let component: LateralRecyclerViewTienda2Component;
  let fixture: ComponentFixture<LateralRecyclerViewTienda2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LateralRecyclerViewTienda2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LateralRecyclerViewTienda2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
