
import { UserLogin } from './../models/user-login';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserRegistration } from './../models/user-registration';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;

    private subscription: Subscription;

    brandNew: boolean;
    errors: string;
    isRequesting: boolean;
    submitted = false;
    login: UserLogin = { userName: '', password: '' };

    constructor(private userService: UserService,
        private _fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
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
                // .finally(() => this.isRequesting = false)
                .subscribe(
                    result => {
                        if (result) {
                            window.location.replace('/fetch-location');
                        }
                    },
                    errors => this.errors = JSON.parse(errors._body).login_failure);
        }
    }

}

