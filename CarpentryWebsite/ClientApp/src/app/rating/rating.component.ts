import { Component, OnInit } from '@angular/core';
import { Rating } from '../models/rating';
import { RatingService } from '../services/rating.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  ratings: Rating[];
  numberOfStars: number;

  constructor(public http: Http, private _router: Router, private _ratingService: RatingService) {
    this.getRatings();
   }

  ngOnInit() {
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

}
