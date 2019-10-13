import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpentryServiceComponent } from './carpentry-service.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { getBaseUrl } from '../../main';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from '../app.module';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';
import { CarpentryServiceService } from '../services/carpentry-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('CarpentryServiceComponent', () => {
  let component: CarpentryServiceComponent;
  let fixture: ComponentFixture<CarpentryServiceComponent>;
  let location: Location;
  let router: Router;

  const mockCarpentryServiceTypes = [{
    carpentryServiceTypeId: 1,
    name: "Franciaágyak",
    carpentryServices: null
  },
  {
    carpentryServiceTypeId: 2,
    name: "Heverők",
    carpentryServices: null
  },
  {
    carpentryServiceTypeId: 3,
    name: "Fotelek",
    carpentryServices: null
  },
  {
    carpentryServiceTypeId: 4,
    name: "Kanapék",
    carpentryServices: null
  },
  {
    carpentryServiceTypeId: 5,
    name: "Szék",
    carpentryServices: null
  },
  {
    carpentryServiceTypeId: 6,
    name: "Autókárpitozás",
    carpentryServices: null
  }];

  const mockCarpentryServices = [{
    carpentryServiceId: 1,
    name: "Csak áthúzás",
    price: 18000,
    description: null,
    carpentryServiceTypeId: 1,
    carpentryServiceType: null,
    pictureId: null,
    picture: null
  },
  {
    carpentryServiceId: 2,
    name: "Szivacsozás",
    price: 18500,
    description: null,
    carpentryServiceTypeId: 2,
    carpentryServiceType: null,
    pictureId: null,
    picture: null
  }];

  let carpentryServiceService: CarpentryServiceService;
  let carpentryServiceTypeService: CarpentryServiceTypeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        CarpentryServiceService, CarpentryServiceTypeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpentryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    carpentryServiceService = TestBed.get(CarpentryServiceService);
    carpentryServiceTypeService = TestBed.get(CarpentryServiceTypeService);
    spyOn(carpentryServiceService, 'getCarpentryServices').and.returnValue(of(mockCarpentryServices));
    spyOn(carpentryServiceTypeService, 'getCarpentryServiceTypes').and.returnValue(of(mockCarpentryServiceTypes));
    spyOn(carpentryServiceService, 'deleteCarpentryService').and.callFake(function(id: number) {
      mockCarpentryServices.forEach(element => {
        let index;
        if (element.carpentryServiceId === id) {
          index = mockCarpentryServices.indexOf(element);
        }
        mockCarpentryServices.splice(index, 1);
      });
      return of(mockCarpentryServices);
    });
    spyOn(carpentryServiceTypeService, 'deleteCarpentryServiceType').and.callFake(function(id: number) {
      mockCarpentryServiceTypes.forEach(element => {
        let index;
        if (element.carpentryServiceTypeId === id) {
          index = mockCarpentryServiceTypes.indexOf(element);
        }
        mockCarpentryServiceTypes.splice(index, 1);
      });
      return of(mockCarpentryServiceTypes);
    });
    spyOn(window, 'confirm').and.returnValue(true);

    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service and return carpentry service types', () => {
    // when
    component.ngOnInit();
    component.getCarpentryServiceTypes();

    // then
      expect(component.carpentryServiceTypes).toEqual(mockCarpentryServiceTypes);
  });

  it('should call service and return carpentry services', () => {
    // when
    component.ngOnInit();
    component.getCarpentryServices();

    // then
      expect(component.carpentryServices).toEqual(mockCarpentryServices);
  });

  it('should delete carpentry service', () => {
    // given
    component.ngOnInit();
    const name = 'service';
    const id = 1;

    // when
    component.deleteService(id, name);

    // then
    expect(component.carpentryServices.find(service => service.carpentryServiceId === id)).toEqual(undefined);
  });

  it('should delete carpentry service type', () => {
    // given
    component.ngOnInit();
    const name = 'servicetype';
    const id = 1;

    // when
    component.deleteType(id, name);

    // then
    expect(component.carpentryServiceTypes.find(service => service.carpentryServiceTypeId === id)).toEqual(undefined);
  });
});
