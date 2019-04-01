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

  constructor(public http: Http, private _router: Router, private _ratingService: RatingService) {
    this.getRatings();
   }

  ngOnInit() {
  }

  getRatings() {
    this._ratingService.getRatings().subscribe(
      ratings => this.ratings = ratings
    );
  }

}
