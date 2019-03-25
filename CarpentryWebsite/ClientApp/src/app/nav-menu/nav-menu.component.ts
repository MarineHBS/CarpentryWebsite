import { UserService } from './../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  public loggedIn: boolean;

  constructor(private _userService: UserService) {
    this.loggedIn = this._userService.isLoggedIn();
    }

  collapse() {
    this.isExpanded = false;
    window.location.reload();
  }

  refresh() {
    window.location.reload();
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
