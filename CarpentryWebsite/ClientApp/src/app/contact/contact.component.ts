import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: Contact[];
  adminFlag: boolean;

  constructor(public http: Http, private _router: Router, private _contactService: ContactService,
    private _userService: UserService) {
      this.adminFlag = _userService.isLoggedIn();
    this.getContacts();
  }

  ngOnInit() {
  }

  getContacts() {
    this._contactService.getContacts().subscribe(
      contacts => {
        this.contacts = contacts;
      });
  }

  deleteContact(id: number, name: string){
    const confirmation = confirm('Biztosan törölni szeretné ezt a kapcsolatot?  ' + name);
    if (confirmation) {
      this._contactService.deleteContact(id).subscribe(data => this.getContacts());
    }
  }

}
