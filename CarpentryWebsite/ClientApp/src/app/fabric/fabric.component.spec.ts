import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricComponent } from './fabric.component';
import { Router } from '@angular/router';
import { Location, APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { FabricService } from '../services/fabric.service';
import { FabricTypeService } from '../services/fabric-type.service';
import { of } from 'rxjs';

describe('FabricComponent', () => {
  let component: FabricComponent;
  let fixture: ComponentFixture<FabricComponent>;
  let location: Location;
  let router: Router;

  let fabricService: FabricService;
  let fabricTypeService: FabricTypeService;

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
    fabricTypeId: 3,
    fabricType: null,
    pictureId: 1,
    picture: null
  }];

  const mockFabricPicturesWithUrl = [{
    pictureId: 1,
    pictureName: "fabric_picture_1.png",
    pictureUrl: null
  },
  {
    pictureId: 2,
    pictureName: "fabric_picture_2.png",
    pictureUrl: null
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        FabricService, FabricTypeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fabricService = TestBed.get(FabricService);
    fabricTypeService = TestBed.get(FabricTypeService);
    spyOn(fabricService, 'getFabrics').and.returnValue(of(mockFabrics));
    spyOn(fabricService, 'getFabricsPictureUrl').and.returnValue(of(mockFabricPicturesWithUrl));
    spyOn(fabricTypeService, 'getFabricTypes').and.returnValue(of(mockFabricTypes));
    spyOn(fabricService, 'deleteFabric').and.callFake(function (id: number) {
      mockFabrics.forEach(element => {
        let index;
        if (element.fabricId === id) {
          index = mockFabrics.indexOf(element);
        }
        mockFabrics.splice(index, 1);
      });
      return of(mockFabrics);
    });
    spyOn(fabricTypeService, 'deleteFabricType').and.callFake(function (id: number) {
      mockFabricTypes.forEach(element => {
        let index;
        if (element.fabricTypeId === id) {
          index = mockFabricTypes.indexOf(element);
        }
        mockFabricTypes.splice(index, 1);
      });
      return of(mockFabricTypes);
    });
    spyOn(window, 'confirm').and.returnValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete fabric', () => {
    // given
    component.ngOnInit();
    const name = 'fabric';
    const id = 1;

    // when
    component.delete(id, name);

    // then
    expect(component.fabrics.find(fabric => fabric.fabricId === id)).toEqual(undefined);
  });

  it('should delete fabric type', () => {
    // given
    component.ngOnInit();
    const name = 'fabrictype';
    const id = 1;

    // when
    component.deleteType(id, name);

    // then
    expect(component.fabricTypes.find(fabricType => fabricType.fabricTypeId === id)).toEqual(undefined);
  });

  it('getFabricUrlById should return fabric by id', () => {
    // when
    component.ngOnInit();

    // then
    component.fabricsWithUrls.forEach((value: string, key: string) => {
      expect(component.getFabricUrlById(key)).toEqual(value);
    });
  });

});
