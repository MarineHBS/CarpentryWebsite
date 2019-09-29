import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFormPopupComponent } from './offer-form-popup.component';

describe('OfferFormPopupComponent', () => {
  let component: OfferFormPopupComponent;
  let fixture: ComponentFixture<OfferFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
