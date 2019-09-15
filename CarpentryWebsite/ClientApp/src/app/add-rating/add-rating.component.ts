import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RatingService } from '../services/rating.service';


@Component({
    selector: 'app-rating-component',
    templateUrl: './add-rating.component.html',
    styleUrls: ['../add-components.css']
})

export class AddRatingComponent implements OnInit {
    addRatingForm: FormGroup;
    title = '';
    errorMessage: any;
    ratingId: number;
    userRatingTypes: string[];

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute, private _ratingService: RatingService, private _router: Router) {
        if (this._avRoute.snapshot.params['id']) {
            this.ratingId = this._avRoute.snapshot.params['id'];
        }
        this.userRatingTypes = ['Nagyon elégedett', 'Elégedett', 'Közepesen elégedett', 'Elégedetlen', 'Nagyon elégedetlen'];
        this.addRatingForm = this._fb.group({
            ratingId: 0,
            user: ['', [Validators.required]],
            userRating: ['', [Validators.required]],
            text: ['', [Validators.required]]
        });
    }

    ngOnInit() {
    }

    save() {
        if (!this.addRatingForm.valid) {
            return;
        }
            this._ratingService.createRating(this.addRatingForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/home']);
                }, error => this.errorMessage = error);
    }
    cancel() {
        this._router.navigate(['/home']);
    }
    get user() { return this.addRatingForm.get('user'); }
    get userRating() { return this.addRatingForm.get('userRating'); }
    get text() { return this.addRatingForm.get('text'); }
}
