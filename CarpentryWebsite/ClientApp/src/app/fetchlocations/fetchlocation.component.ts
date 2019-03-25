import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { LocationService } from '../services/locationservice.service';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-fetch-location-component',
    templateUrl: './fetchlocation.component.html'
})

export class FetchLocationComponent {
    public locationList: LocationData[];
    public adminFlag: boolean;

    constructor(public http: Http, private _router: Router, private _locationService: LocationService, private _userService: UserService) {
        this.getLocations();
        this.adminFlag = this._userService.isAdmin();
    }

    getLocations() {
        this._locationService.getLocations().subscribe(
            data => this.locationList = data
        );
    }

    delete(locationID, name) {
        const confirmation = confirm('Are you sure you want to delete location with id: ' + locationID + ', Name: ' + name + '?');
        if (confirmation) {
            this._locationService.deleteLocation(locationID).subscribe((data) => {
                this.getLocations();
            }, error => console.error(error));
        }
    }
}

interface LocationData {
    locationId: number;
    name: string;
    description: string;
    picture: string;
}
