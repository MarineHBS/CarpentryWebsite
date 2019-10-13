import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddCarpentryServiceTypeComponent } from './add-carpentry-service-type.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { FormBuilder } from '@angular/forms';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

describe('AddCarpentryServiceTypeComponent', () => {
  let component: AddCarpentryServiceTypeComponent;
  let fixture: ComponentFixture<AddCarpentryServiceTypeComponent>;
  let location: Location;
  let router: Router;

  const mockCarpentryServiceTypeService = {
    createCarpentryServiceType: () => {
      return of('created');
    },
    updateCarpentryServiceType: () => {
      return of('updated');
    }
  };

  let spyCreateCarpentryServiceType;
  let spyUpdateCarpentryServiceType;

  beforeEach(async(() => {
    spyCreateCarpentryServiceType = spyOn(mockCarpentryServiceTypeService, 'createCarpentryServiceType').and.callThrough();
    spyUpdateCarpentryServiceType = spyOn(mockCarpentryServiceTypeService, 'updateCarpentryServiceType').and.callThrough();
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [ ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: CarpentryServiceTypeService, useValue: mockCarpentryServiceTypeService },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarpentryServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('properties should return the correct data on the form', () => {
    // given
    component.addCarpentryServiceTypeForm.controls['name'].setValue('testName');

    const realName = component.addCarpentryServiceTypeForm.get('name');

    // when
    const expectedName = component.name;

    // then
    expect(expectedName).toEqual(realName);
  });

  it('default should be home', fakeAsync(() => {
    expect(location.path()).toBe('/home');
  }));

  it('save should call createCarpentryServiceType if title is create', () => {
    // given
    component.title = 'Szolgáltatáscsoport felvétele';
    component.addCarpentryServiceTypeForm.controls['name'].setValue('testName');

    // when
    component.save();

    // then
    expect(spyCreateCarpentryServiceType).toHaveBeenCalled();
  });

  it('save should call updateCarpentryServiceType if title is update', () => {
    // given
    component.title = 'Szolgáltatáscsoport módosítása';
    component.addCarpentryServiceTypeForm.controls['name'].setValue('testName');

    // when
    component.save();

    // then
    expect(spyUpdateCarpentryServiceType).toHaveBeenCalled();
  });
});
