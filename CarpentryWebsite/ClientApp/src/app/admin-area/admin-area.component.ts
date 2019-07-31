import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(userService: UserService) {
    this.isLoggedIn = userService.isLoggedIn();
   }

  ngOnInit() {
  }

}
