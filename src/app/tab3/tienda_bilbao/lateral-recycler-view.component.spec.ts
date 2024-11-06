import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LateralRecyclerViewComponent } from './lateral-recycler-view.component';

describe('LateralRecyclerViewComponent', () => {
  let component: LateralRecyclerViewComponent;
  let fixture: ComponentFixture<LateralRecyclerViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LateralRecyclerViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LateralRecyclerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
