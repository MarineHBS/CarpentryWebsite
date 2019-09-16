import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CarpentryServiceType } from '../models/carpentry-service-type';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

  isLoggedIn: boolean;
  carpentryServiceTypes: CarpentryServiceType[];

  constructor(userService: UserService, private carpentryServiceTypeService: CarpentryServiceTypeService) {
    this.isLoggedIn = userService.isLoggedIn();
    // this.carpentryServiceTypeService.getCarpentryServiceTypes().subscribe(types => this.carpentryServiceTypes = types);
   }

  ngOnInit() {
  }

}
