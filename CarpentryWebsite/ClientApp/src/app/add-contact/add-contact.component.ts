import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  addContactForm: FormGroup;
  title = 'Kapcsolat felvétele';
  errorMessage: any;
  contactId: number;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
     private _contactService: ContactService, private _router: Router) {
      if (this._avRoute.snapshot.params['id']) {
          this.contactId = this._avRoute.snapshot.params['id'];
      }
      this.addContactForm = this._fb.group({
          contactId: 0,
          name: ['', [Validators.required]],
          phone: ['', [Validators.required]],
          emailAddress: ['', [Validators.required]]
      });
  }

  ngOnInit() {
  }

  save() {
      if (!this.addContactForm.valid) {
          return;
      }
          this._contactService.createContact(this.addContactForm.value)
              .subscribe((data) => {
                  this._router.navigate(['/contact-us']);
              }, error => this.errorMessage = error);
  }
  cancel() {
      this._router.navigate(['/contact-us']);
  }
  get name() { return this.addContactForm.get('name'); }
  get phone() { return this.addContactForm.get('phone'); }
  get emailAddress() { return this.addContactForm.get('emailAddress'); }

}
