import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferencePictureComponent } from './add-reference-picture.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { FormBuilder } from '@angular/forms';
import { ReferencePictureService } from '../services/reference-picture.service';
import { of } from 'rxjs';

describe('AddReferencePictureComponent', () => {
  let component: AddReferencePictureComponent;
  let fixture: ComponentFixture<AddReferencePictureComponent>;

  const mockReferencePictureService = {
    createReferencePicture: () => {
      return of('created');
    }
  };

  let spyCreateReferencePicture;

  beforeEach(async(() => {
    spyCreateReferencePicture = spyOn(mockReferencePictureService, 'createReferencePicture').and.callThrough();
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [ ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: ReferencePictureService, useValue: mockReferencePictureService },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReferencePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
