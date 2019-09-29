import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { OfferRequestService } from '../services/offer-request.service';
import { MatDialog } from '@angular/material';
import { OfferFormPopupComponent } from '../offer-form-popup/offer-form-popup.component';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

  isLoggedIn: boolean;
  defaultColDef: any;
  rowSelection;
  message: string;
  showModal = false;

  columnDefs = [
    { headerName: 'Név', field: 'name', sortable: true, filter: true },
    { headerName: 'Email-cím', field: 'emailAddress', sortable: true, filter: true },
    { headerName: 'Üzenet', field: 'message', sortable: true, filter: true }
  ];

  rowData: any;
  pictureName: string;

  constructor(userService: UserService, private offerRequestService: OfferRequestService,
     private dialog: MatDialog, private pictureService: PictureService) {
    this.isLoggedIn = userService.isLoggedIn();
    this.defaultColDef = {
      width: 300,
      sortable: true,
      resizable: true,
      filter: true
    };
    this.rowData = offerRequestService.getOfferRequests();
    this.rowSelection = 'single';
  }

  onRowSelected(event) {
    if (event.node.selected) {
      if (event.node.data.pictureId === null) {
        this.dialog.open(OfferFormPopupComponent, {
          panelClass: 'offer-form-popup-container',
          maxHeight: '90vh',
          data: {
            offerDetails: event.node.data
          }
        });
        return;
      }
      this.message = event.node.data.message;
      this.pictureService.getPictureDetails(event.node.data.pictureId).subscribe(res => {
        this.pictureName = res.pictureName;
        this.dialog.open(OfferFormPopupComponent, {
          panelClass: 'offer-form-popup-container',
          maxHeight: '90vh',
          data: {
            offerDetails: event.node.data,
            pictureName: this.pictureName
          }
        });
      });
    }
  }

  ngOnInit() {
  }

}
