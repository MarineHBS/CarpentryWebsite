import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReferencePictureService } from '../services/reference-picture.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-add-reference-picture',
    templateUrl: './add-reference-picture.component.html',
    styleUrls: ['./add-reference-picture.component.css']
})
export class AddReferencePictureComponent implements OnInit {
    addReferencePictureForm: FormGroup;
    title = 'Referenciakép felvétele';
    errorMessage: any;
    referencePictureId: number;
    pictureId: number;

    selectedFile: File = null;
    pictureLocation: String = '/assets/default.png';

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _referencePictureService: ReferencePictureService, private _router: Router,
        private http: HttpClient) {
        if (this._avRoute.snapshot.params['id']) {
            this.referencePictureId = this._avRoute.snapshot.params['id'];
        }
        this.addReferencePictureForm = this._fb.group({
            pictureId: 0,
        });
    }

    ngOnInit() {
    }

    save() {
        if (!this.addReferencePictureForm.valid) {
            return;
        }
        const formData: FormData = new FormData();
        formData.append('image', this.selectedFile, this.selectedFile.name);
        /*this._referencePictureService.createReferencePicture(this.addReferencePictureForm.value)
            .subscribe((data) => {
                this._router.navigate(['/admin-area']);
            }, error => this.errorMessage = error);*/
        this._referencePictureService.uploadReferencePicture(formData);
    }
    cancel() {
        this._router.navigate(['/admin-area']);
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = (_event: any) => {
            this.pictureLocation = _event.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
        console.log(this.selectedFile);
    }

    get pictureUrl() {
        return this.addReferencePictureForm.get('pictureUrl');

    }

}
