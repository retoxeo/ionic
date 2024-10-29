import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmartsPage } from './smarts.page';

describe('SmartsPage', () => {
  let component: SmartsPage;
  let fixture: ComponentFixture<SmartsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
