import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PictureService {
    CarpentryWebsiteUrl: string;
    userId: string;

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.CarpentryWebsiteUrl = baseUrl;
        this.userId = localStorage.getItem('userId');
    }

    getPictures() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/picture/get')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getPictureDetails(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/picture/details/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    createPicture(Picture) {
        return this._http.post(this.CarpentryWebsiteUrl + 'api/picture/create', Picture)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updatePicture(Picture) {
        return this._http.put(this.CarpentryWebsiteUrl + 'api/picture/edit', Picture)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deletePicture(id: number) {
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/picture/delete/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
