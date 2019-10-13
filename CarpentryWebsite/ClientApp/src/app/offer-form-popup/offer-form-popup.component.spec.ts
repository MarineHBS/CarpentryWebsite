import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFormPopupComponent } from './offer-form-popup.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('OfferFormPopupComponent', () => {
  let component: OfferFormPopupComponent;
  let fixture: ComponentFixture<OfferFormPopupComponent>;

  const mockData = {
    pictureName: 'pictureName',
    offerDetails: {
      name: "User",
      emailAddress: "emailAddress",
      message: "message"
    }
  };

  const mockMatDialogRef = {
    close: () => {
      return '';
    }
  };

  let spyDialogClose;

  beforeEach(async(() => {
    spyDialogClose = spyOn(mockMatDialogRef, 'close').and.callThrough();
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockMatDialogRef }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferFormPopupComponent);
    component = fixture.componentInstance;
    component.data = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('properties should be set with ngOnInit', () => {
    expect(component.name).toEqual('User');
    expect(component.imageUrl).toEqual('images/offer_pictures/pictureName');
    expect(component.message).toEqual('message');
    expect(component.emailAddress).toEqual('emailAddress');
  });

  it('close should call dialogref close', () => {
    // when
    component.close();

    // then
    expect(spyDialogClose).toHaveBeenCalled();
  });
});
