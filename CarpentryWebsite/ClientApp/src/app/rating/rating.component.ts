import { Component, OnInit, Inject, AfterContentInit } from '@angular/core';
import { Rating } from '../models/rating';
import { RatingService } from '../services/rating.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, AfterContentInit {
  ratings: Rating[];
  numberOfStars: number;
  slideIndex = 1;

  constructor(@Inject(DOCUMENT) document, public http: Http, private _router: Router, private _ratingService: RatingService) {
    this.getRatings();
  }

  ngOnInit() {
  }
  ngAfterContentInit(): void {
  }

  getStars(r: Rating) {
    switch (r.userRating) {
      case 'Nagyon elégedett':
        this.numberOfStars = 5;
        break;
      case 'Elégedett':
        this.numberOfStars = 4;
        break;
      case 'Közepesen elégedett':
        this.numberOfStars = 3;
        break;
      case 'Elégedetlen':
        this.numberOfStars = 2;
        break;
      case 'Nagyon elégedetlen':
        this.numberOfStars = 1;
        break;
      default: break;
    }
    return new Array(this.numberOfStars);
  }

  getBlackStars() {
    return new Array(5 - this.numberOfStars);
  }

  getRatings() {
    this._ratingService.getRatings().subscribe(
      ratings => this.ratings = ratings
    );
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n) {
    let i: number;
    const slides = document.getElementsByClassName('mySlides');
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }
    if ((slides[this.slideIndex - 1] as HTMLElement) !== undefined) {
      (slides[this.slideIndex - 1] as HTMLElement).style.display = 'block';
    }
  }

}
