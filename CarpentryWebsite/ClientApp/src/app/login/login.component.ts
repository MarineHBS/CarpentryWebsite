
import { UserLogin } from './../models/user-login';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserRegistration } from './../models/user-registration';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;

    private subscription: Subscription;
    isLoggedIn: boolean;
    showError: boolean;

    brandNew: boolean;
    errors: string;
    isRequesting: boolean;
    submitted = false;
    login: UserLogin = { userName: '', password: '' };

    constructor(private userService: UserService,
        private _fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
        private dialog: MatDialog) {
        this.isLoggedIn = userService.isLoggedIn();
        this.loginForm = this._fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            picture: ['']
        });
    }

    ngOnInit() {
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.brandNew = param['brandNew'];
                this.login.userName = param['email'];
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loginUser({ value, valid }: { value: UserLogin, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.userService.login(value.userName, value.password)
                .subscribe(
                    result => {
                        if (result) {
                            window.location.replace('/admin-area');
                        }
                    },
                    error => {
                        this.showError = true;
                        this.errors = error;
                    });
        }
    }

    closeErrorDiv() {
        this.showError = false;
    }

}

