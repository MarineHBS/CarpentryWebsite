import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CarpentryServiceService {
    CarpentryWebsiteUrl: string;
    userId: string;

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.CarpentryWebsiteUrl = baseUrl;
        this.userId = localStorage.getItem('userId');
    }

    getCarpentryServices() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/carpentry-service/get')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getCarpentryServicesByTypeId(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/carpentry-service/get-type/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getCarpentryServiceDetails(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/carpentry-service/details/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    createCarpentryService(carpentryService) {
        return this._http.post(this.CarpentryWebsiteUrl + 'api/carpentry-service/create', carpentryService)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updateCarpentryService(carpentryService) {
        return this._http.put(this.CarpentryWebsiteUrl + 'api/carpentry-service/edit', carpentryService)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deleteCarpentryService(id: number) {
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/carpentry-service/delete/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
