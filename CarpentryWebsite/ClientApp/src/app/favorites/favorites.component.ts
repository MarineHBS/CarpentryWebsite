/*import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { LocationService } from "../services/locationservice.service";
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-favorites-component',
    templateUrl: './favorites.component.html'
})

export class FavoritesComponent {
    public favoriteList: LocationData[];

    constructor(public http: Http, private _router: Router, private _locationService: LocationService) {
        this.getFavorites();
    }
    getFavorites() {
        this._locationService.getFavorites().subscribe(
            data => this.favoriteList = data
        )
    }

    removeFavorite(locationID){
        this._locationService.deleteFavorite(locationID).subscribe((data) => {
            this.getFavorites();
        }, error => console.error(error))
    }
}

interface LocationData {
    locationId: number;
    name: string;
    description: string;
    picture: string;
}
*/
