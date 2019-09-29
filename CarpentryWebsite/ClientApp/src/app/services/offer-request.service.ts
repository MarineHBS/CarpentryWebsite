import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OfferRequestService {
    CarpentryWebsiteUrl: string;
    userId: string;

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.CarpentryWebsiteUrl = baseUrl;
        this.userId = localStorage.getItem('userId');
    }

    getOfferRequests() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/offer-request/get')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getOfferRequestDetails(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/offer-request/details/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    createOfferRequest(offerRequest: FormData) {
        return this._http.post(this.CarpentryWebsiteUrl + 'api/offer-request/create', offerRequest)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updateOfferRequest(offerRequest) {
        return this._http.put(this.CarpentryWebsiteUrl + 'api/offer-request/edit', offerRequest)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deleteOfferRequest(id: number) {
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/offer-request/delete/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
