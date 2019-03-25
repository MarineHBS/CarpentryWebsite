import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FabricTypeService {
    CarpentryWebsiteUrl: string;
    userId: string;

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.CarpentryWebsiteUrl = baseUrl;
        this.userId = localStorage.getItem('userId');
    }

    getFabricTypes() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/fabric-type/get')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getFabricTypeDetails(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/fabric-type/details/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    createFabricType(fabricType) {
        return this._http.post(this.CarpentryWebsiteUrl + 'api/fabric-type/create', fabricType)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updateFabricType(fabricType) {
        return this._http.put(this.CarpentryWebsiteUrl + 'api/fabric-type/edit', fabricType)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deleteFabricType(id: number) {
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/fabric-type/delete/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
