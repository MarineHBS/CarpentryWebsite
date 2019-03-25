import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CarpentryServiceService } from '../services/carpentry-service.service';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';
import { CarpentryServiceType } from '../models/carpentry-service-type';


@Component({
    selector: 'app-add-carpentry-service-type-component',
    templateUrl: './add-carpentry-service-type.component.html'
})

export class AddCarpentryServiceTypeComponent implements OnInit {
    addCarpentryServiceTypeForm: FormGroup;
    title = 'Szolgáltatáscsoport felvétele';
    errorMessage: any;
    carpentryServiceTypeId: number;

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute, private _carpentryServiceTypeService: CarpentryServiceTypeService,
        private _router: Router) {
        if (this._avRoute.snapshot.params['id']) {
            this.carpentryServiceTypeId = this._avRoute.snapshot.params['id'];
        }
        this.addCarpentryServiceTypeForm = this._fb.group({
            carpentryServiceTypeId: 0,
            name: ['', [Validators.required]],
        });
    }

    ngOnInit() {
        if (this.carpentryServiceTypeId > 0) {
            this.title = 'Edit';
            this._carpentryServiceTypeService.getCarpentryServiceTypeDetails(this.carpentryServiceTypeId)
                .subscribe(resp => this.addCarpentryServiceTypeForm.setValue(resp),
                    error => this.errorMessage = error);
        }
    }
    save() {
        if (!this.addCarpentryServiceTypeForm.valid) {
            return;
        }
        if (this.title === 'Szolgáltatáscsoport felvétele') {
            this._carpentryServiceTypeService.createCarpentryServiceType(this.addCarpentryServiceTypeForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/carpentry-services']);
                }, error => this.errorMessage = error);
        } else if (this.title === 'Edit') {
            this._carpentryServiceTypeService.updateCarpentryServiceType(this.addCarpentryServiceTypeForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/carpentry-services']);
                }, error => this.errorMessage = error);
        }
    }
    cancel() {
        this._router.navigate(['/carpentry-services']);
    }
}
