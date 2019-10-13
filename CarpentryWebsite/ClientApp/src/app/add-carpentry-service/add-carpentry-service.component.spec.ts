import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddCarpentryServiceComponent } from './add-carpentry-service.component';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';
import { CarpentryServiceService } from '../services/carpentry-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('AddCarpentryServiceComponent', () => {
  let component: AddCarpentryServiceComponent;
  let fixture: ComponentFixture<AddCarpentryServiceComponent>;
  let location: Location;
  let router: Router;

  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
          get(): string {
              return '123';
          },
      },
  },
  };

  const mockCarpentryServiceTypes = [{
    carpentryServiceTypeId : 1,
    name: "Franciaágyak",
    carpentryServices: null
  },
  {
    carpentryServiceTypeId : 2,
    name: "Heverők",
    carpentryServices: null
  },
  {
    carpentryServiceTypeId : 3,
    name: "Fotelek",
    carpentryServices: null
  },
  {
    carpentryServiceTypeId : 4,
    name: "Kanapék",
    carpentryServices: null
  },
  {
    carpentryServiceTypeId : 5,
    name: "Szék",
    carpentryServices: null
  },
  {
    carpentryServiceTypeId : 6,
    name: "Autókárpitozás",
    carpentryServices: null
  }];

  const mockCarpentryServiceTypeService = {
    getCarpentryServiceTypes: () => {
      return of(mockCarpentryServiceTypes);
    }
  };

  const mockCarpentryServiceService = {
    createCarpentryService: () => {
      return of('created');
    },
    updateCarpentryService: () => {
      return of('created');
    }
  };

  let spyGetCarpentryServiceTypes;
  let spyCreateCarpentryService;
  let spyUpdateCarpentryService;

  beforeEach(async(() => {
    spyGetCarpentryServiceTypes = spyOn(mockCarpentryServiceTypeService, 'getCarpentryServiceTypes').and.callThrough();
    spyCreateCarpentryService = spyOn(mockCarpentryServiceService, 'createCarpentryService').and.callThrough();
    spyUpdateCarpentryService = spyOn(mockCarpentryServiceService, 'updateCarpentryService').and.callThrough();
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [ ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: CarpentryServiceTypeService, useValue: mockCarpentryServiceTypeService },
        { provide: CarpentryServiceService, useValue: mockCarpentryServiceService },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarpentryServiceComponent);
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
    component.addCarpentryServiceForm.controls['name'].setValue('testName');
    component.addCarpentryServiceForm.controls['description'].setValue('testDescription');
    component.addCarpentryServiceForm.controls['price'].setValue('testPrice');

    const realName = component.addCarpentryServiceForm.get('name');
    const realDescription = component.addCarpentryServiceForm.get('description');
    const realPrice = component.addCarpentryServiceForm.get('price');

    // when
    const expectedName = component.name;
    const expectedDescription = component.description;
    const expectedPrice = component.price;

    // then
    expect(expectedName).toEqual(realName);
    expect(expectedDescription).toEqual(realDescription);
    expect(expectedPrice).toEqual(realPrice);
  });

  it('default should be home', fakeAsync(() => {
    expect(location.path()).toBe('/home');
  }));

  it('getCarpentryServiceTypes should call' +
   'CarpentryServiceTypeService and return correct results', () => {
    // when
      component.getCarpentryServiceTypes();

    // then
      expect(spyGetCarpentryServiceTypes).toHaveBeenCalled();
      expect(component.carpentryServiceTypeList).toEqual(mockCarpentryServiceTypes);
  });

  it('save should call createCarpentryService if title is create', () => {
    // given
    component.title = 'Szolgáltatás felvétele';
    component.addCarpentryServiceForm.controls['name'].setValue('testName');
    component.addCarpentryServiceForm.controls['description'].setValue('testDescription');
    component.addCarpentryServiceForm.controls['price'].setValue('testPrice');
    component.addCarpentryServiceForm.controls['carpentryServiceTypeId'].setValue('3');

    // when
    component.save();

    // then
    expect(spyCreateCarpentryService).toHaveBeenCalled();
  });

  it('save should call updateCarpentryService if title is update', () => {
    // given
    component.title = 'Szolgáltatás módosítása';
    component.addCarpentryServiceForm.controls['name'].setValue('testName');
    component.addCarpentryServiceForm.controls['description'].setValue('testDescription');
    component.addCarpentryServiceForm.controls['price'].setValue('testPrice');
    component.addCarpentryServiceForm.controls['carpentryServiceTypeId'].setValue('3');

    // when
    component.save();

    // then
    expect(spyUpdateCarpentryService).toHaveBeenCalled();
  });
});
