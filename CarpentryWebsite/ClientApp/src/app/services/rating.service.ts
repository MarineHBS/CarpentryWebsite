import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RatingService {
    CarpentryWebsiteUrl: string;
    userId: string;

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.CarpentryWebsiteUrl = baseUrl;
        this.userId = localStorage.getItem('userId');
    }

    getRatings() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/rating/get')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getRatingsByTypeId(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/rating/get-type/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getRatingDetails(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/rating/details/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    createRating(Rating) {
        return this._http.post(this.CarpentryWebsiteUrl + 'api/rating/create', Rating)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updateRating(Rating) {
        return this._http.put(this.CarpentryWebsiteUrl + 'api/rating/edit', Rating)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deleteRating(id: number) {
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/rating/delete/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
