import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFabricComponent } from './add-fabric.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { of } from 'rxjs';
import { FabricTypeService } from '../services/fabric-type.service';
import { FabricService } from '../services/fabric.service';
import { FormBuilder } from '@angular/forms';

describe('AddFabricComponent', () => {
  let component: AddFabricComponent;
  let fixture: ComponentFixture<AddFabricComponent>;

  const mockFabricTypes = [
    {
      fabricTypeId : 1,
      name: "Textilbőrök",
      fabrics: null
    },
    {
      fabricTypeId : 2,
      name: "Síkszövetek",
      fabrics: null
    },
    {
      fabricTypeId : 3,
      name: "bútorszövetek",
      fabrics: null
    },
    {
      fabricTypeId : 4,
      name: "bútorszövetek2",
      fabrics: null
    },
    {
      fabricTypeId : 5,
      name: "bútorszövetek3",
      fabrics: null
    },
    {
      fabricTypeId : 6,
      name: "Matrachuzatok",
      fabrics: null
    },
  ];

  const mockFabricTypeService = {
    getFabricTypes: () => {
      return of(mockFabricTypes);
    }
  };

  const mockFabricService = {
    createFabric: () => {
      return of('created');
    },
    updateFabric: () => {
      return of('created');
    }
  };

  let spyGetFabricTypes;
  let spyCreateFabric;
  let spyUpdateFabric;

  beforeEach(async(() => {
    spyGetFabricTypes = spyOn(mockFabricTypeService, 'getFabricTypes').and.callThrough();
    spyCreateFabric = spyOn(mockFabricService, 'createFabric').and.callThrough();
    spyUpdateFabric = spyOn(mockFabricService, 'updateFabric').and.callThrough();
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [ ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: FabricTypeService, useValue: mockFabricTypeService },
        { provide: FabricService, useValue: mockFabricService },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('properties should return the correct data on the form', () => {
    // given
    component.addFabricForm.controls['name'].setValue('testName');
    component.addFabricForm.controls['price'].setValue('testPrice');

    const realName = component.addFabricForm.get('name');
    const realPrice = component.addFabricForm.get('price');

    // when
    const expectedName = component.name;
    const expectedPrice = component.price;

    // then
    expect(expectedName).toEqual(realName);
    expect(expectedPrice).toEqual(realPrice);
  });

  it('getFabricTypes should call' +
   'FabricService and return correct results', () => {
    // when
      component.getFabricTypes();

    // then
      expect(spyGetFabricTypes).toHaveBeenCalled();
      expect(component.fabricTypeList).toEqual(mockFabricTypes);
  });

  it('save should call createFabric if title is create', () => {
    // given
    component.title = 'Szövet felvétele';
    component.addFabricForm.controls['name'].setValue('testName');
    component.addFabricForm.controls['price'].setValue('testPrice');
    component.addFabricForm.controls['fabricTypeId'].setValue('3');

    // when
    component.save();

    // then
    expect(spyCreateFabric).toHaveBeenCalled();
  });

  it('save should call updateFabric if title is update', () => {
    // given
    component.title = 'Szövet módosítása';
    component.addFabricForm.controls['name'].setValue('testName');
    component.addFabricForm.controls['price'].setValue('testPrice');
    component.addFabricForm.controls['fabricTypeId'].setValue('3');

    // when
    component.save();

    // then
    expect(spyUpdateFabric).toHaveBeenCalled();
  });
});
