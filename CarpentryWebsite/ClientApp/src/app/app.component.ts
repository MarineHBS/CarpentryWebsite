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

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PriceEstimateComponent, {
      panelClass: 'price-estimate-container'
    });
  }

  openChat() {
    if (this.isChatOpened) {
      console.log('close chat');
      this.isChatOpened = false;
    } else if (!this.isChatOpened) {
      // TODO : chat window open
      console.log('open chat');
      this.isChatOpened = true;
    }
  }
}
