import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-offer-form-popup',
  templateUrl: './offer-form-popup.component.html',
  styleUrls: ['./offer-form-popup.component.css']
})
export class OfferFormPopupComponent implements OnInit {

  name: string;
  emailAddress: string;
  message: string;
  imageUrl: string;
  imageExists: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, @Inject('BASE_URL') baseUrl: string,
   public dialogRef: MatDialogRef<OfferFormPopupComponent>) { }

  ngOnInit() {
    if (this.data.pictureName === undefined) {
      this.imageExists = false;
    } else {
      this.imageExists = true;
    }
    this.name = this.data.offerDetails.name;
    this.emailAddress = this.data.offerDetails.emailAddress;
    this.message = this.data.offerDetails.message;
    this.imageUrl = 'images/offer_pictures/' + this.data.pictureName;
  }

  close() {
    this.dialogRef.close();
  }
}
