/*import { LocationService } from './../services/locationservice.service';
import { FetchLocationComponent } from './../fetchlocations/fetchlocation.component';
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {Http, Headers} from '@angular/http";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";


@Component({
    selector: 'app-addlocation-component',
    templateUrl: './addlocation.component.html'
})

export class AddLocation implements OnInit {
    locationForm: FormGroup;
    title: string = 'Add';
    errorMessage: any;
    locationId: number;

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute, private _locationService: LocationService, private _router: Router) {
        if (this._avRoute.snapshot.params['id']) {
            this.locationId = this._avRoute.snapshot.params['id'];
        }
        this.locationForm = this._fb.group({
            locationId: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            picture: ['']
        });
    }

    ngOnInit() {
        if (this.locationId > 0) {
            this.title = 'Edit';
            this._locationService.getLocationDetails(this.locationId)
                .subscribe(resp => this.locationForm.setValue(resp),
                    error => this.errorMessage = error);
        }
    }

    save() {
        if (!this.locationForm.valid) {
            return;
        }
        if (this.title === 'Add') {
            this._locationService.saveLocation(this.locationForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-location']);
                }, error => this.errorMessage = error)
        } else if (this.title === 'Edit') {
            this._locationService.updateLocation(this.locationForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-location']);
                }, error => this.errorMessage = error);
        }
    }
    cancel() {
        this._router.navigate(['/fetch-location']);
    }
    get name() { return this.locationForm.get('name'); }
    get description() { return this.locationForm.get('description'); }
    get picture() { return this.locationForm.get('picture');
}


}
*/
