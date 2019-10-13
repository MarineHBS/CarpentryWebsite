import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { RatingService } from '../services/rating.service';
import { Rating } from '../models/rating';
import { of } from 'rxjs';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  let rating: Rating;

  const mockRatings = [{
    ratingId: 1,
    text: "Minden szuper, csak ajánlani tudom!",
    user: "Szabó Béla",
    userRating: "Elégedett"
  },
  {
    ratingId: 2,
    text: "Korrekt, szakértő kiszolgálás. Gyors, pontos értékesítés",
    user: "Szabó János",
    userRating: "Közepesen Elégedett"
  },
  {
    ratingId: 3,
    text: "Mindennel meg voltam elégedve",
    user: "János Béla",
    userRating: "Nagyon Elégedett"
  },
];

let ratingService: RatingService;
let spyShowSlides;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        RatingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ratingService = TestBed.get(RatingService);
    spyShowSlides = spyOn(component, 'showSlides').and.callThrough();
    spyOn(ratingService, 'getRatings').and.returnValue(of(mockRatings));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getStars should return correct amount of stars if rating is Nagyon elégedett', () => {
    // given
    rating = {
      ratingId: 1,
      userRating: 'Nagyon elégedett',
      user: 'Bela',
      text: 'Értékelés'
    };

    // when
    component.getStars(rating);

    // then
    expect(component.numberOfStars).toEqual(5);
  });

  it('getStars should return correct amount of stars if rating is Elégedett', () => {
    // given
    rating = {
      ratingId: 1,
      userRating: 'Elégedett',
      user: 'Bela',
      text: 'Értékelés'
    };

    // when
    component.getStars(rating);

    // then
    expect(component.numberOfStars).toEqual(4);
  });

  it('getStars should return correct amount of stars if rating is Közepesen elégedett', () => {
    // given
    rating = {
      ratingId: 1,
      userRating: 'Közepesen elégedett',
      user: 'Bela',
      text: 'Értékelés'
    };

    // when
    component.getStars(rating);

    // then
    expect(component.numberOfStars).toEqual(3);
  });

  it('getStars should return correct amount of stars if rating is Elégedetlen', () => {
    // given
    rating = {
      ratingId: 1,
      userRating: 'Elégedetlen',
      user: 'Bela',
      text: 'Értékelés'
    };

    // when
    component.getStars(rating);

    // then
    expect(component.numberOfStars).toEqual(2);
  });

  it('getStars should return correct amount of stars if rating is Nagyon elégedetlen', () => {
    // given
    rating = {
      ratingId: 1,
      userRating: 'Nagyon elégedetlen',
      user: 'Bela',
      text: 'Értékelés'
    };

    // when
    component.getStars(rating);

    // then
    expect(component.numberOfStars).toEqual(1);
  });

  it('getBlackStars should return correct amount of stars', () => {
    // given
    component.numberOfStars = 3;

    // when
    const blackStars = component.getBlackStars();

    // then
    expect(blackStars.length).toEqual(2);
  });

  it('getRatings should call service', () => {
    // when
    component.getRatings();

    // then
    expect(component.ratings).toEqual(mockRatings);
  });

  it('plusSlides should call showSlides', () => {
    // given
    component.slideIndex = 3;

    // when
    component.plusSlides(5);

    // then
    expect(spyShowSlides).toHaveBeenCalledWith(8);
  });
});
