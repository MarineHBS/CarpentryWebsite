import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: Contact[];

  constructor(public http: Http, private _router: Router, private _contactService: ContactService) {
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

}
