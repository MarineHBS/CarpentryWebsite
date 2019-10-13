import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatingComponent } from './add-rating.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../app.module';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { RatingService } from '../services/rating.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('AddRatingComponent', () => {
  let component: AddRatingComponent;
  let fixture: ComponentFixture<AddRatingComponent>;

  const mockRatingService = {
    createRating: () => {
      return of('created');
    }
  };

  let spyCreateRating;

  beforeEach(async(() => {
    spyCreateRating = spyOn(mockRatingService, 'createRating').and.callThrough();
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [ ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: RatingService, useValue: mockRatingService },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('properties should return the correct data on the form', () => {
    // given
    component.addRatingForm.controls['user'].setValue('testUser');
    component.addRatingForm.controls['userRating'].setValue('testUserRating');
    component.addRatingForm.controls['text'].setValue('testText');

    const realUser = component.addRatingForm.get('user');
    const realUserRating = component.addRatingForm.get('userRating');
    const realText = component.addRatingForm.get('text');

    // when
    const expectedUser = component.user;
    const expectedUserRating = component.userRating;
    const expectedText = component.text;

    // then
    expect(expectedUser).toEqual(realUser);
    expect(expectedUserRating).toEqual(realUserRating);
    expect(expectedText).toEqual(realText);
  });

  it('save should call createRatingService', () => {
    // given
    component.addRatingForm.controls['user'].setValue('testUser');
    component.addRatingForm.controls['userRating'].setValue('testUserRating');
    component.addRatingForm.controls['text'].setValue('testText');

    // when
    component.save();

    // then
    expect(spyCreateRating).toHaveBeenCalled();
  });
});
