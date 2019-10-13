import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFabricTypeComponent } from './add-fabric-type.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { FabricTypeService } from '../services/fabric-type.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('AddFabricTypeComponent', () => {
  let component: AddFabricTypeComponent;
  let fixture: ComponentFixture<AddFabricTypeComponent>;

  const mockFabricTypeService = {
    createFabricType: () => {
      return of('created');
    },
    updateFabricType: () => {
      return of('updated');
    }
  };

  let spyCreateFabricType;
  let spyUpdateFabricType;

  beforeEach(async(() => {
    spyCreateFabricType = spyOn(mockFabricTypeService, 'createFabricType').and.callThrough();
    spyUpdateFabricType = spyOn(mockFabricTypeService, 'updateFabricType').and.callThrough();
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [ ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: FabricTypeService, useValue: mockFabricTypeService },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFabricTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('properties should return the correct data on the form', () => {
    // given
    component.addFabricTypeForm.controls['name'].setValue('testName');

    const realName = component.addFabricTypeForm.get('name');

    // when
    const expectedName = component.name;

    // then
    expect(expectedName).toEqual(realName);
  });

  it('save should call createFabricType if title is create', () => {
    // given
    component.title = 'Szövettípus felvétele';
    component.addFabricTypeForm.controls['name'].setValue('testName');

    // when
    component.save();

    // then
    expect(spyCreateFabricType).toHaveBeenCalled();
  });

  it('save should call updateFabricType if title is update', () => {
    // given
    component.title = 'Szövettípus módosítása';
    component.addFabricTypeForm.controls['name'].setValue('testName');

    // when
    component.save();

    // then
    expect(spyUpdateFabricType).toHaveBeenCalled();
  });
});
