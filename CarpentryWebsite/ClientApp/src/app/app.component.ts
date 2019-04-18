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

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PriceEstimateComponent, {
      panelClass: 'price-estimate-container'
    });

  }
}
