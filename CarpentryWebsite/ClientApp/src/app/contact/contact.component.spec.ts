import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { ContactService } from '../services/contact.service';
import { getBaseUrl } from '../../main';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let location: Location;
  let router: Router;

  const mockContacts = [{
      contactId: 1,
      name: "Szabó János",
      phone: "202-555-0112",
      emailAddress: "szabo.janos@butorkarpitos.hu"
    },
    {
      contactId: 2,
      name: "Szabó Béla",
      phone: "202-41234112",
      emailAddress: "szabo.bela@butorkarpitos.hu"
    },
    {
      contactId: 3,
      name: "Béla János",
      phone: "202-5421112",
      emailAddress: "bela.janos@butorkarpitos.hu"
    }];

  let contactService: ContactService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        ContactService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    contactService = TestBed.get(ContactService);
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(contactService, 'getContacts').and.returnValue(of(mockContacts));
    spyOn(contactService, 'deleteContact').and.callFake(function(id: number) {
      mockContacts.forEach(element => {
        let index;
        if (element.contactId === id) {
          index = mockContacts.indexOf(element);
        }
        mockContacts.splice(index, 1);
      });
      return of(mockContacts);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getContacts should return contacts', () => {
    // when
    component.getContacts();

    // then
    expect(component.contacts).toEqual(mockContacts);
  });

  it('deleteContact should delete contact', () => {
    // given
    component.ngOnInit();
    const name = 'contact';
    const id = 1;

    // when
    component.deleteContact(id, name);

    // then
    expect(component.contacts.find(contact => contact.contactId === id)).toEqual(undefined);
  });
});
