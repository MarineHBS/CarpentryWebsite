import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserRegistration } from './../models/user-registration';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    errors: string;
    isRequesting: boolean;
    submitted = false;
    registerForm: FormGroup;
    showError: boolean;

    constructor(private userService: UserService, private router: Router, private _fb: FormBuilder) {
        this.registerForm = this._fb.group({
            userName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.minLength(6)]],
            passwordConfirmation: ['', {Validator: this.checkPasswords }]
        });
    }

    ngOnInit() {
    }

    checkPasswords(group: FormGroup) {
    const password = this.registerForm.get('password').value;
    const passwordConfirmation = this.registerForm.get('passwordConfirmation').value;

    return password === passwordConfirmation ? null : { notSame: true };
    }

    registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
        if (!this.registerForm.valid) {
            return;
        }
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.userService.register(value.userName, value.email, value.password)
                      .subscribe(
                        result  => {
                            if (result['error']) {
                                const errorValue = JSON.parse(result['error']);
                                this.showError = true;
                                this.errors = errorValue['register_failure'][0];
                            }
                            if (!result['error']) {
                            this.showError = false;
                            this.router.navigate(['/login']);
                        }
                    },
                        errors => this.errors = JSON.parse(errors._body).
                        Registerfailure[0].substring(8, JSON.parse(errors._body).Registerfailure[0].length));
        }
     }

     closeErrorDiv() {
        this.showError = false;
    }

     get userName() { return this.registerForm.get('userName'); }
     get email() { return this.registerForm.get('email'); }
     get password() { return this.registerForm.get('password'); }
     get passwordConfirmation() { return this.registerForm.get('passwordConfirmation'); }

}
