import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReferencePictureService {
    CarpentryWebsiteUrl: string;
    userId: string;

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.CarpentryWebsiteUrl = baseUrl;
        this.userId = localStorage.getItem('userId');
    }

    getReferencePictures() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/reference-picture/get')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getReferencePictureDetails(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/reference-picture/details/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    createReferencePicture(referencePicture) {
        return this._http.post(this.CarpentryWebsiteUrl + 'api/reference-picture/create', referencePicture)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updateReferencePicture(referencePicture) {
        return this._http.put(this.CarpentryWebsiteUrl + 'api/reference-picture/edit', referencePicture)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deleteReferencePicture(id: number) {
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/reference-picture/delete/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
