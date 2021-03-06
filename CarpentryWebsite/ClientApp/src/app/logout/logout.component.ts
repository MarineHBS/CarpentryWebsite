import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-logout-component',
    templateUrl: '../login/login.component.html'
})

export class LogoutComponent implements OnInit {

    constructor(private userService: UserService, private router: Router) {
        this.userService.logout();
        window.alert('Sikeresen kijelentkezett');
        this.router.navigate(['/home']);
     }

    ngOnInit() {
    }
}
