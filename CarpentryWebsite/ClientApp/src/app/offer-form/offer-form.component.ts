import { Component, OnInit } from '@angular/core';
import { OfferRequestService } from '../services/offer-request.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OfferRequest } from '../models/offer-request';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {

  errors: string;
  isRequesting: boolean;
  submitted = false;
  offerRequestForm: FormGroup;
  showError: boolean;
  successFulSubmit: boolean;

  constructor(private offerRequestService: OfferRequestService, private router: Router, private _fb: FormBuilder) {
    this.successFulSubmit = false;
    this.offerRequestForm = this._fb.group({
      name: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      message: ['', [Validators.required]],
      offerPicture: ['']
    });
  }

  ngOnInit() {
  }

  submit() {
    if (!this.offerRequestForm.valid) {
      this.successFulSubmit = false;
      return;
    }
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (this.offerRequestForm.valid) {
      this.offerRequestService.createOfferRequest(this.offerRequestForm.value)
        .subscribe(
          result => {
            if (result['error']) {
              const errorValue = JSON.parse(result['error']);
              this.showError = true;
              this.errors = errorValue['register_failure'][0];
            }
            if (!result['error']) {
              this.showError = false;
              this.offerRequestForm.reset();
              this.successFulSubmit = true;
              window.alert('Sikeresen elküldve');
            }
          });
    }
  }

  get name() { return this.offerRequestForm.get('name'); }
  get emailAddress() { return this.offerRequestForm.get('emailAddress'); }
  get message() { return this.offerRequestForm.get('message'); }
  get offerPicture() { return this.offerRequestForm.get('offerPicture'); }

}
