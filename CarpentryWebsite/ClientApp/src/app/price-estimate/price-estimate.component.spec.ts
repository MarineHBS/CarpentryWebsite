import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEstimateComponent } from './price-estimate.component';

describe('PriceEstimateComponent', () => {
  let component: PriceEstimateComponent;
  let fixture: ComponentFixture<PriceEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
