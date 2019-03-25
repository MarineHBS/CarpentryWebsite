import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CarpentryServiceTypeService {
    CarpentryWebsiteUrl: string;
    userId: string;

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.CarpentryWebsiteUrl = baseUrl;
        this.userId = localStorage.getItem('userId');
    }

    getCarpentryServiceTypes() {
        console.log(this.CarpentryWebsiteUrl + 'api/carpentry-service-type/get');
        return this._http.get(this.CarpentryWebsiteUrl + 'api/carpentry-service-type/get')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getCarpentryServiceTypeDetails(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/carpentry-service-type/details/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    createCarpentryServiceType(carpentryServiceType) {
        return this._http.post(this.CarpentryWebsiteUrl + 'api/carpentry-service-type/create', carpentryServiceType)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updateCarpentryServiceType(carpentryServiceType) {
        return this._http.put(this.CarpentryWebsiteUrl + 'api/carpentry-service-type/edit', carpentryServiceType)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deleteCarpentryServiceType(id: number) {
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/carpentry-service-type/delete/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
