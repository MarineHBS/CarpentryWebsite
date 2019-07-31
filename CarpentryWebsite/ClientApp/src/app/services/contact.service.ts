import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactService {
    CarpentryWebsiteUrl: string;
    userId: string;

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.CarpentryWebsiteUrl = baseUrl;
        this.userId = localStorage.getItem('userId');
    }

    getContacts() {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/contact/get')
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    getContactDetails(id: number) {
        return this._http.get(this.CarpentryWebsiteUrl + 'api/contact/details/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    createContact(contact) {
        return this._http.post(this.CarpentryWebsiteUrl + 'api/contact/create', contact)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    updateContact(contact) {
        return this._http.put(this.CarpentryWebsiteUrl + 'api/contact/edit', contact)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    deleteContact(id: number) {
        return this._http.delete(this.CarpentryWebsiteUrl + 'api/contact/delete/' + id)
        .map((res: Response) => res.json())
        .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
