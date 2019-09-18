import { UserService } from './../services/user.service';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  loggedIn: boolean;
  userName: string;

  constructor(private _userService: UserService) {
    this.loggedIn = _userService.isLoggedIn();
    this._userService.loggedInUpdated.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.userName = _userService.getUsername();
    this._userService.usernameUpdated.subscribe(userName => this.userName = userName);
  }

  logout() {
    this._userService.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  refresh() {
    window.location.reload();
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
