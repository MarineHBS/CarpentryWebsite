import { LocationService } from './../services/locationservice.service';
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
    selector: 'app-fetchlocation-details-component',
    templateUrl: './fetchlocation-details.component.html'
})

export class FetchLocationDetailsComponent implements OnInit {
    public location: LocationData;
    locationId: number;
    errorMessage: any;

    constructor(private _avRoute: ActivatedRoute, private _locationService: LocationService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.locationId = this._avRoute.snapshot.params["id"];
        }
    }

    ngOnInit() {
        if (this.locationId > 0) {
            this._locationService.getLocationDetails(this.locationId)
                .subscribe(resp => this.location = resp,
                    error => this.errorMessage = error);
        }
    }

    addToFavorite(){
        this._locationService.addFavorite(this.locationId).subscribe(res => 
            this.ngOnInit()
        , error => console.error(error))
    }
    
}
interface LocationData {
  locationId: number;
  name: string;
  description: string;
  picture: string;
}
