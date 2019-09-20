import { Component, ViewChild } from '@angular/core';
import { PriceEstimateComponent } from './price-estimate/price-estimate.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public isChatOpened: boolean;
  isOpened: boolean;

  constructor(public dialog: MatDialog) {
  }

  openChat() {
    if (this.isChatOpened) {
      this.isChatOpened = false;
    } else if (!this.isChatOpened) {
      this.isChatOpened = true;
    }
  }
}
