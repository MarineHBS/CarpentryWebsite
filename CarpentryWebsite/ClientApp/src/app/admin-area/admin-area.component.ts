import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { OfferRequestService } from '../services/offer-request.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

  isLoggedIn: boolean;
  defaultColDef: any;
  rowSelection;

  columnDefs = [
    { headerName: 'Név', field: 'name', sortable: true, filter: true },
    { headerName: 'Email-cím', field: 'emailAddress', sortable: true, filter: true },
    { headerName: 'Üzenet', field: 'message', sortable: true, filter: true }
  ];

  rowData: any;

  constructor(userService: UserService, private offerRequestService: OfferRequestService) {
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
      window.alert('Az üzenet: ' + event.node.data.message);
    }
  }

  ngOnInit() {
  }

}
