import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LocationService {
    CarpentryWebsiteUrl: string;
    userId: string;

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.CarpentryWebsiteUrl = baseUrl;
        this.userId = localStorage.getItem('userId');
    }

    getLocations() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/location/index')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getFavorites() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/location/favorites/' + this.userId)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getLocationDetails(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/location/details/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    saveLocation(location) {
        return this._http.post(this.CarpentryWebsiteUrl + 'api/location/create', location)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    addFavorite(id: number) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.CarpentryWebsiteUrl + 'api/location/addFavorite/' + id,
         JSON.stringify({userId: this.userId}), { headers })
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updateLocation(location) {
        return this._http.put(this.CarpentryWebsiteUrl + 'api/location/edit', location)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deleteFavorite(id: number) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/location/' + id + '/user/' + this.userId)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deleteLocation(id: number) {
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/location/delete/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
