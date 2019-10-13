import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFormComponent } from './offer-form.component';
import { OfferRequestService } from '../services/offer-request.service';
import { FormBuilder } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';

describe('OfferFormComponent', () => {
  let component: OfferFormComponent;
  let fixture: ComponentFixture<OfferFormComponent>;

  let spyCreateOfferRequest;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        OfferRequestService, FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyCreateOfferRequest = spyOn(OfferRequestService.prototype, 'createOfferRequest').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('properties should return the correct data on the form', () => {
    // given
    component.offerRequestForm.controls['name'].setValue('testName');
    component.offerRequestForm.controls['emailAddress'].setValue('testMessage');
    component.offerRequestForm.controls['message'].setValue('testMessage');

    const realName = component.offerRequestForm.get('name');
    const realEmailAddress = component.offerRequestForm.get('emailAddress');
    const realMessage = component.offerRequestForm.get('message');

    // when
    const expectedName = component.name;
    const expectedEmailAddress = component.emailAddress;
    const expectedMessage = component.message;

    // then
    expect(expectedName).toEqual(realName);
    expect(expectedEmailAddress).toEqual(realEmailAddress);
    expect(expectedMessage).toEqual(realMessage);
  });

  it('submit should call offerRequestService', () => {
    // given
    component.offerRequestForm.controls['name'].setValue('testName');
    component.offerRequestForm.controls['emailAddress'].setValue('testMessage');
    component.offerRequestForm.controls['message'].setValue('testMessage');

    // when
    component.submit();

    // then
    expect(spyCreateOfferRequest).toHaveBeenCalled();
  });
});
