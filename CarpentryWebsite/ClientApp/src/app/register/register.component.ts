import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserRegistration } from './../models/user-registration';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    errors: string;
    isRequesting: boolean;
    submitted = false;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
    }
    registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.userService.register(value.userName, value.email, value.password)
                      // .finally (() => this.isRequesting = false)
                      .subscribe(
                        result  => {if (result) {
                            this.router.navigate(['/login'], {queryParams: {brandNew: true, email: value.email}});
                        }},
                        errors => this.errors = JSON.parse(errors._body).
                        Registerfailure[0].substring(8, JSON.parse(errors._body).Registerfailure[0].length));
        }
     }

}
