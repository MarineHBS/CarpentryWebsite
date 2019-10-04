import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FabricType } from '../models/fabric-type';
import { Fabric } from '../models/fabric';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricTypeService } from '../services/fabric-type.service';
import { FabricService } from '../services/fabric.service';
import { PictureService } from '../services/picture.service';
import { getBaseUrl } from 'src/main';

@Component({
    selector: 'app-add-fabric',
    templateUrl: './add-fabric.component.html',
    styleUrls: ['./add-fabric.component.css', '../add-components.css']
})
export class AddFabricComponent implements OnInit {
    addFabricForm: FormGroup;
    title = 'Szövet felvétele';
    errorMessage: any;
    fabricId: number;
    fabricTypeList: FabricType[];
    selectedFile: File = null;
    pictureLocation: String = '/assets/default.png';

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute, private _fabricTypeService: FabricTypeService, private pictureService: PictureService,
        private _fabricService: FabricService, private _router: Router, @Inject('BASE_URL') baseUrl: string) {
        if (this._avRoute.snapshot.params['id']) {
            this.fabricId = this._avRoute.snapshot.params['id'];
        }
        this.getFabricTypes();
        this.addFabricForm = this._fb.group({
            fabricId: 0,
            name: ['', [Validators.required]],
            price: ['', [Validators.required]],
            fabricTypeId: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        if (this.fabricId > 0) {
            this.title = 'Szövet módosítása';
            this._fabricService.getFabricDetails(this.fabricId)
                .subscribe(resp => {
                    this.pictureService.getPictureDetails(resp.pictureId)
                        .subscribe(pic => this.pictureLocation = 'images/fabric_pictures/' + pic.pictureName);
                    this.addFabricForm.setValue(resp);
                },
                    error => this.errorMessage = error);
        }
    }

    getFabricTypes() {
        this._fabricTypeService.getFabricTypes().subscribe(
            types => this.fabricTypeList = types
        );
    }

    save() {
        if (!this.addFabricForm.valid) {
            return;
        }
        const formData: FormData = new FormData();

        if (this.selectedFile !== null) {
            formData.append('image', this.selectedFile, this.selectedFile.name);
            formData.append('imageChanged', 'true');
        } else {
            formData.append('imageChanged', 'false');
        }
        formData.append('fabricId', this.addFabricForm.value.fabricId);
        formData.append('fabricTypeId', this.addFabricForm.value.fabricTypeId);
        formData.append('fabricName', this.addFabricForm.value.name);
        formData.append('price', this.addFabricForm.value.price);
        console.log('formData', formData);
        if (this.title === 'Szövet felvétele') {
            this._fabricService.createFabric(formData)
                .subscribe((data) => {
                    this._router.navigate(['/fabrics']);
                }, error => this.errorMessage = error);
        } else if (this.title === 'Szövet módosítása') {
            this._fabricService.updateFabric(formData)
                .subscribe((data) => {
                    this._router.navigate(['/fabrics']);
                }, error => this.errorMessage = error);
        }
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = (_event: any) => {
            this.pictureLocation = _event.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
    }

    cancel() {
        this._router.navigate(['/fabrics']);
    }
    get name() { return this.addFabricForm.get('name'); }
    get price() { return this.addFabricForm.get('price'); }
    get fabricTypeId() { return this.addFabricForm.get('fabricTypeId'); }
}
