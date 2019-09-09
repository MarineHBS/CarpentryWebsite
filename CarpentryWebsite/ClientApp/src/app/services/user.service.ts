import { Injectable, Inject, Output } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()

export class UserService {
    CarpentryWebsiteUrl: string;

    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private loggedIn = false;
    @Output() loggedInUpdated: EventEmitter<boolean> = new EventEmitter();
    private adminFlag = false;
    @Output() adminFlagUpdated: EventEmitter<boolean> = new EventEmitter();

    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string, private dialog: MatDialog) {
        this.loggedIn = !!localStorage.getItem('auth_token');
        this.loggedInUpdated.emit(this.loggedIn);
        if (localStorage.getItem('isAdmin') === 'true') {
            this.adminFlag = true;
            this.adminFlagUpdated.emit(this.adminFlag);
        } else {
            this.adminFlag = false;
            this.adminFlagUpdated.emit(this.adminFlag);
        }
        console.log('constructor');
        this._authNavStatusSource.next(this.loggedIn);
        this.CarpentryWebsiteUrl = baseUrl;
    }

    register(userName: string, email: string, password: string)/*: Observable<UserRegistration>*/ {
        const body = JSON.stringify({ userName, email, password });
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.CarpentryWebsiteUrl + 'api/register', body, options)
            .map(res => true)
            .catch(this.errorHandler);
    }

    login(userName: string, password: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.CarpentryWebsiteUrl + 'api/auth/login', JSON.stringify({ userName, password }), { headers })
            .map(res => res.json())
            .map(res => {
                res.json();
                localStorage.setItem('auth_token', res.auth_token);
                localStorage.setItem('userId', res.id);
                localStorage.setItem('isAdmin', res.isAdmin);
                this.adminFlag = res.isAdmin;
                this.adminFlagUpdated.emit(this.adminFlag);
                this.loggedIn = true;
                this.loggedInUpdated.emit(this.loggedIn);
                this._authNavStatusSource.next(true);
                return true;
            })
            .catch(this.errorHandler);
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        this.loggedIn = false;
        this.loggedInUpdated.emit(this.loggedIn);
        this.adminFlag = false;
        this.adminFlagUpdated.emit(this.adminFlag);
        this._authNavStatusSource.next(false);
    }

    isAdmin() {
        return this.adminFlag;
    }

    isLoggedIn() {
        return this.loggedIn;
    }
    errorHandler(error: HttpErrorResponse) {
        const errorBody = error['_body'];
        const errorValue = JSON.parse(errorBody)['login_failure'];
        console.log('error is: ' + errorValue);
        return Observable.create(errorValue);
    }
}
