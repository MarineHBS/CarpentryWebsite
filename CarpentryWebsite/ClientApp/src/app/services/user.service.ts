import { Injectable, Inject, Output } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

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

    private expiresIn: number;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private dialog: MatDialog,
                private router: Router) {
        this.loggedIn = !!localStorage.getItem('auth_token');
        const now = new Date().getTime();
        const logoutDate = parseInt(localStorage.getItem('leftUntilLogout'), 10);
        const leftUntilLogout = logoutDate - now;

        if (localStorage.getItem('userId')) {
            this.loggedIn = true;
        }
        this.loggedInUpdated.emit(this.loggedIn);
        if (localStorage.getItem('isAdmin') === 'true') {
            this.adminFlag = true;
            this.adminFlagUpdated.emit(this.adminFlag);
        } else {
            this.adminFlag = false;
            this.adminFlagUpdated.emit(this.adminFlag);
        }
        if (now < logoutDate) {
            console.log('Time left until logging out automatically ' + leftUntilLogout);
            setTimeout(() => {
                this.logout();
                this.router.navigate(['/login']);
            }, leftUntilLogout);
        } else if (now > logoutDate) {
            this.logout();
        }
        this._authNavStatusSource.next(this.loggedIn);
        this.CarpentryWebsiteUrl = baseUrl;
    }

    register(userName: string, email: string, password: string) {
        const body = JSON.stringify({ userName, email, password });
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.CarpentryWebsiteUrl + 'api/register', { userName, email, password }, {responseType: 'text'})
            .map(res => true)
            .catch(this.errorHandler);
    }

    login(userName: string, password: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('responseType', 'text' );

        return this.http.post(this.CarpentryWebsiteUrl + 'api/auth/login', { userName, password }, {responseType: 'text'} )
            .map((res) => {
                const resJson = JSON.parse(res);
                localStorage.setItem('auth_token', resJson.auth_token);
                localStorage.setItem('userId', resJson.id);
                localStorage.setItem('isAdmin', resJson.isAdmin);
                localStorage.setItem('expiresIn', resJson.expires_in);
                localStorage.setItem('leftUntilLogout', ((new Date().getTime()) + resJson.expires_in * 1000).toString());
                this.adminFlag = resJson.isAdmin;
                this.adminFlagUpdated.emit(this.adminFlag);
                this.loggedIn = true;
                this.loggedInUpdated.emit(true);
                this.expiresIn = resJson.expiresIn;
                this._authNavStatusSource.next(true);
                return true;
            })
            .catch(this.errorHandler);
    }

    setLocalStorageData(resJson: any): void {
        localStorage.setItem('auth_token', resJson.auth_token);
        localStorage.setItem('userId', resJson.id);
        localStorage.setItem('isAdmin', resJson.isAdmin);
        this.adminFlag = resJson.isAdmin;
        this.adminFlagUpdated.emit(this.adminFlag);
        this.loggedIn = true;
        this.loggedInUpdated.emit(this.loggedIn);
        this._authNavStatusSource.next(true);
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('leftUntilLogout');
        this.loggedIn = false;
        this.loggedInUpdated.emit(false);
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
        const errorBody = error['error'];
        return of(error);
    }
}
