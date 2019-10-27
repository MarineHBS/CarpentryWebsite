import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEstimateComponent } from './price-estimate.component';
import { FabricService } from '../services/fabric.service';
import { FabricTypeService } from '../services/fabric-type.service';
import { CarpentryServiceService } from '../services/carpentry-service.service';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';
import { getBaseUrl } from '../../main';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { of } from 'rxjs';

describe('PriceEstimateComponent', () => {
  let component: PriceEstimateComponent;
  let fixture: ComponentFixture<PriceEstimateComponent>;

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
  },
  {
    carpentryServiceId: 3,
    name: "Áthúzás",
    price: 2500,
    description: null,
    carpentryServiceTypeId: 2,
    carpentryServiceType: null,
    pictureId: null,
    picture: null
  }];

  const mockFabricTypes = [
    {
      fabricTypeId: 1,
      name: "Textilbőrök",
      fabrics: null
    },
    {
      fabricTypeId: 2,
      name: "Síkszövetek",
      fabrics: null
    },
    {
      fabricTypeId: 3,
      name: "bútorszövetek",
      fabrics: null
    },
    {
      fabricTypeId: 4,
      name: "bútorszövetek2",
      fabrics: null
    },
    {
      fabricTypeId: 5,
      name: "bútorszövetek3",
      fabrics: null
    },
    {
      fabricTypeId: 6,
      name: "Matrachuzatok",
      fabrics: null
    },
  ];

  const mockFabrics = [{
    fabricId: 1,
    name: "Almara",
    price: 2390,
    fabricTypeId: 1,
    fabricType: null,
    pictureId: 1,
    picture: null
  },
  {
    fabricId: 2,
    name: "Bölény",
    price: 5000,
    fabricTypeId: 2,
    fabricType: null,
    pictureId: 2,
    picture: null
  },
  {
    fabricId: 3,
    name: "Szépia",
    price: 6000,
    fabricTypeId: 2,
    fabricType: null,
    pictureId: 1,
    picture: null
  }];

  let carpentryServiceService: CarpentryServiceService;
  let carpentryServiceTypeService: CarpentryServiceTypeService;
  let fabricService: FabricService;
  let fabricTypeService: FabricTypeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        FabricService, FabricTypeService,
         CarpentryServiceService, CarpentryServiceTypeService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    carpentryServiceService = TestBed.get(CarpentryServiceService);
    carpentryServiceTypeService = TestBed.get(CarpentryServiceTypeService);
    fabricService = TestBed.get(FabricService);
    fabricTypeService = TestBed.get(FabricTypeService);
    spyOn(carpentryServiceService, 'getCarpentryServices').and.returnValue(of(mockCarpentryServices));
    spyOn(carpentryServiceTypeService, 'getCarpentryServiceTypes').and.returnValue(of(mockCarpentryServiceTypes));
    spyOn(fabricService, 'getFabrics').and.returnValue(of(mockFabrics));
    spyOn(fabricTypeService, 'getFabricTypes').and.returnValue(of(mockFabricTypes));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set values properly', () => {
    // when
    component.ngOnInit();

    // then
    expect(component.carpentryServices).toEqual(mockCarpentryServices);
    expect(component.carpentryServiceTypeList).toEqual(mockCarpentryServiceTypes);
    expect(component.fabrics).toEqual(mockFabrics);
    expect(component.fabricTypes).toEqual(mockFabricTypes);
  });

  it('getCarpentryServicesByTypeId should return correct values', () => {
    // given
    const carpentryServices = [{
      carpentryServiceId: 2,
      name: "Szivacsozás",
      price: 18500,
      description: null,
      carpentryServiceTypeId: 2,
      carpentryServiceType: null,
      pictureId: null,
      picture: null
    },
    {
      carpentryServiceId: 3,
      name: "Áthúzás",
      price: 2500,
      description: null,
      carpentryServiceTypeId: 2,
      carpentryServiceType: null,
      pictureId: null,
      picture: null
    }];

    // when
    component.ngOnInit();

    // then
    expect(component.getCarpentryServicesByTypeId(2)).toEqual(carpentryServices);
  });

  it('getFabricsByTypeId should return correct values', () => {
    // given
    const fabrics = [{
      fabricId: 2,
      name: "Bölény",
      price: 5000,
      fabricTypeId: 2,
      fabricType: null,
      pictureId: 2,
      picture: null
    },
    {
      fabricId: 3,
      name: "Szépia",
      price: 6000,
      fabricTypeId: 2,
      fabricType: null,
      pictureId: 1,
      picture: null
    }];

    // when
    component.ngOnInit();

    // then
    expect(component.getFabricsByTypeId(2)).toEqual(fabrics);
  });

  it('calculateEstimate should return correct results', () => {
    // given
    component.currentCarpentryServicePrice = 500;
    component.currentFabricPrice = 500;
    component.size = 3;
    spyOn(component.priceEstimateResultEvent, 'emit');

    // when
    component.calculateEstimate();

    // then
    expect(component.priceEstimateResult).toEqual(2000);
    expect(component.showEstimate).toEqual(true);
    expect(component.priceEstimateResultEvent.emit).toHaveBeenCalled();
  });

  it('showInputData should set inputData and emit event', () => {
    // given
    spyOn(component.needNewComponentEvent, 'emit');

    // when
    component.showInput();

    // then
    expect(component.showInputData).toEqual(true);
    expect(component.needNewComponentEvent.emit).toHaveBeenCalled();
  });
});
