import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FabricService {
    CarpentryWebsiteUrl: string;
    userId: string;

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.CarpentryWebsiteUrl = baseUrl;
        this.userId = localStorage.getItem('userId');
    }

    getFabrics() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/fabric/get')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getFabricsByTypeId(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/fabric/get-type/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getFabricsPictureUrl() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/fabric/get-url/')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getFabricDetails(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/fabric/details/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    createFabric(formData: FormData) {
        return this._http.post(this.CarpentryWebsiteUrl + 'api/fabric/create', formData)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updateFabric(formData: FormData) {
        return this._http.put(this.CarpentryWebsiteUrl + 'api/fabric/edit', formData)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deleteFabric(id: number) {
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/fabric/delete/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
