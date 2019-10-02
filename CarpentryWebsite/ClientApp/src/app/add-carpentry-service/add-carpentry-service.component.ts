import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CarpentryServiceService } from '../services/carpentry-service.service';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';
import { CarpentryServiceType } from '../models/carpentry-service-type';


@Component({
    selector: 'app-add-carpentry-service-component',
    templateUrl: './add-carpentry-service.component.html',
    styleUrls: ['./add-carpentry-service.component.css', '../add-components.css']
})

export class AddCarpentryServiceComponent implements OnInit {
    addCarpentryServiceForm: FormGroup;
    title = 'Szolgáltatás felvétele';
    errorMessage: any;
    carpentryServiceId: number;
    carpentryServiceTypeList: CarpentryServiceType[];

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute, private _carpentryServiceTypeService: CarpentryServiceTypeService,
         private _carpentryServiceService: CarpentryServiceService, private _router: Router) {
        if (this._avRoute.snapshot.params['id']) {
            this.carpentryServiceId = this._avRoute.snapshot.params['id'];
        }
        this.getCarpentryServiceTypes();
        this.addCarpentryServiceForm = this._fb.group({
            carpentryServiceId: 0,
            name: ['', [Validators.required]],
            description: ['', []],
            price: ['', [Validators.required]],
            carpentryServiceTypeId: ['', [Validators.required]],
            // picture: ['']
        });
    }

    ngOnInit() {
        if (this.carpentryServiceId > 0) {
            this.title = 'Szolgáltatás módosítása';
            this._carpentryServiceService.getCarpentryServiceDetails(this.carpentryServiceId)
                .subscribe(resp => this.addCarpentryServiceForm.setValue(resp),
                    error => this.errorMessage = error);
        }
    }

    getCarpentryServiceTypes() {
        this._carpentryServiceTypeService.getCarpentryServiceTypes().subscribe(
            types => this.carpentryServiceTypeList = types
        );
    }

    save() {
        if (!this.addCarpentryServiceForm.valid) {
            return;
        }
        if (this.title === 'Szolgáltatás felvétele') {
            this._carpentryServiceService.createCarpentryService(this.addCarpentryServiceForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/carpentry-services']);
                }, error => this.errorMessage = error);
        } else if (this.title === 'Szolgáltatás módosítása') {
            this._carpentryServiceService.updateCarpentryService(this.addCarpentryServiceForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/carpentry-services']);
                }, error => this.errorMessage = error);
        }
    }
    cancel() {
        this._router.navigate(['/carpentry-services']);
    }
    get name() { return this.addCarpentryServiceForm.get('name'); }
    get description() { return this.addCarpentryServiceForm.get('description'); }
    get price() { return this.addCarpentryServiceForm.get('price'); }
    get picture() { return this.addCarpentryServiceForm.get('picture');
}


}
