import { Component, ViewChild } from '@angular/core';
import { PriceEstimateComponent } from './price-estimate/price-estimate.component';
import { MatDialog } from '@angular/material';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public isChatOpened: boolean;
  isOpened: boolean;
  loggedIn = false;

  constructor(public dialog: MatDialog, private userService: UserService) {
    this.loggedIn = userService.isLoggedIn();
    this.userService.loggedInUpdated.subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  openChat() {
    if (this.isChatOpened) {
      this.isChatOpened = false;
    } else if (!this.isChatOpened) {
      this.isChatOpened = true;
    }
  }
}
