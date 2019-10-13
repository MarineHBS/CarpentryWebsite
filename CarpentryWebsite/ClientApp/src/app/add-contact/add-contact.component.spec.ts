import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactComponent } from './add-contact.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { ContactService } from '../services/contact.service';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  const mockContactService = {
    createContact: () => {
      return of('created');
    },
    updateContact: () => {
      return of('created');
    }
  };

  let spyCreateContact;
  let spyUpdateContact;

  beforeEach(async(() => {
    spyCreateContact = spyOn(mockContactService, 'createContact').and.callThrough();
    spyUpdateContact = spyOn(mockContactService, 'updateContact').and.callThrough();

    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [ ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: ContactService, useValue: mockContactService },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('properties should return the correct data on the form', () => {
    // given
    component.addContactForm.controls['name'].setValue('testName');
    component.addContactForm.controls['phone'].setValue('testPhone');
    component.addContactForm.controls['emailAddress'].setValue('testEmailAddress');

    const realName = component.addContactForm.get('name');
    const realPhone = component.addContactForm.get('phone');
    const realEmailAddress = component.addContactForm.get('emailAddress');

    // when
    const expectedName = component.name;
    const expectedPhone = component.phone;
    const expectedEmailAddress = component.emailAddress;

    // then
    expect(expectedName).toEqual(realName);
    expect(expectedPhone).toEqual(realPhone);
    expect(expectedEmailAddress).toEqual(realEmailAddress);
  });

  it('save should call createCarpentryServiceType if title is create', () => {
    // given
    component.title = 'Kapcsolat felvétele';
    component.addContactForm.controls['name'].setValue('testName');
    component.addContactForm.controls['phone'].setValue('testPhone');
    component.addContactForm.controls['emailAddress'].setValue('testEmailAddress');

    // when
    component.save();

    // then
    expect(spyCreateContact).toHaveBeenCalled();
  });

  it('save should call updateCarpentryServiceType if title is update', () => {
    // given
    component.title = 'Kapcsolat módosítása';
    component.addContactForm.controls['name'].setValue('testName');
    component.addContactForm.controls['phone'].setValue('testPhone');
    component.addContactForm.controls['emailAddress'].setValue('testEmailAddress');

    // when
    component.save();

    // then
    expect(spyUpdateContact).toHaveBeenCalled();
  });
});
