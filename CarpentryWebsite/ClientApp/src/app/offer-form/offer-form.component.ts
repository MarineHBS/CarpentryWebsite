import { Component, OnInit } from '@angular/core';
import { OfferRequestService } from '../services/offer-request.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
  selectedFile: File = null;

  constructor(private offerRequestService: OfferRequestService, private router: Router, private _fb: FormBuilder) {
    this.successFulSubmit = false;
    this.offerRequestForm = this._fb.group({
      name: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      message: ['', [Validators.required]]
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
      const formData: FormData = new FormData();
      if (this.selectedFile ) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
        formData.append('imageAdded', 'true');
      } else {
        formData.append('imageAdded', 'false');
      }
      formData.append('name', this.offerRequestForm.value.name);
      formData.append('emailAddress', this.offerRequestForm.value.emailAddress);
      formData.append('message', this.offerRequestForm.value.message);
      this.offerRequestService.createOfferRequest(formData)
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

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  get name() { return this.offerRequestForm.get('name'); }
  get emailAddress() { return this.offerRequestForm.get('emailAddress'); }
  get message() { return this.offerRequestForm.get('message'); }

}
