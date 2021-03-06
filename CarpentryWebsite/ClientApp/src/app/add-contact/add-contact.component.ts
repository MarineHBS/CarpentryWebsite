import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css', '../add-components.css']
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
        if (this.contactId > 0) {
            this.title = 'Kapcsolat módosítása';
            this._contactService.getContactDetails(this.contactId)
                .subscribe(resp => this.addContactForm.setValue(resp),
                    error => this.errorMessage = error);
        }
    }

    save() {
        if (!this.addContactForm.valid) {
            return;
        }
        if (this.title === 'Kapcsolat felvétele') {
            this._contactService.createContact(this.addContactForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/contact-us']);
                }, error => this.errorMessage = error);
        } else if (this.title === 'Kapcsolat módosítása') {
            this._contactService.updateContact(this.addContactForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/contact-us']);
                }, error => this.errorMessage = error);
        }
    }
    cancel() {
        this._router.navigate(['/contact-us']);
    }
    get name() { return this.addContactForm.get('name'); }
    get phone() { return this.addContactForm.get('phone'); }
    get emailAddress() { return this.addContactForm.get('emailAddress'); }

}
