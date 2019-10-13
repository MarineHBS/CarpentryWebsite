import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencePictureComponent } from './reference-picture.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { ReferencePictureService } from '../services/reference-picture.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('ReferencePictureComponent', () => {
  let component: ReferencePictureComponent;
  let fixture: ComponentFixture<ReferencePictureComponent>;
  let location: Location;
  let router: Router;

  const mockReferencePictures = [{
    pictureId: 24,
    pictureName: "reference_picture_2.png",
    pictureUrl: null,
  },
  {
    pictureId: 4,
    pictureName: "reference_picture_3.png",
    pictureUrl: null,
  },
  {
    pictureId: 10,
    pictureName: "reference_picture_1.png",
    pictureUrl: null,
  }];

  let referencePictureService: ReferencePictureService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        ReferencePictureService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    referencePictureService = TestBed.get(ReferencePictureService);
    spyOn(referencePictureService, 'getReferencePicturesWithUrl').and.returnValue(of(mockReferencePictures));
    spyOn(referencePictureService, 'deleteReferencePicture').and.callFake(function(id: number) {
      mockReferencePictures.forEach(element => {
        let index;
        if (element.pictureId === id) {
          index = mockReferencePictures.indexOf(element);
        }
        mockReferencePictures.splice(index, 1);
      });
      return of(mockReferencePictures);
    });
    spyOn(window, 'confirm').and.returnValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getReferencePictures should return correct values', () => {
    // when
    component.getReferencePictures();

    // then
    expect(component.referencePictures).toEqual(mockReferencePictures);
  });

  it('deleting a reference picture should correctly delete it', () => {
    component.getReferencePictures();
    const id = 1;

    // when
    component.delete(id);

    // then
    expect(component.referencePictures.find(picture => picture.pictureId === id)).toEqual(undefined);
  });
});
