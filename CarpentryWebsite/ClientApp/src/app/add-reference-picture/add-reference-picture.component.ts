import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReferencePictureService } from '../services/reference-picture.service';

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

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _referencePictureService: ReferencePictureService, private _router: Router) {
      if (this._avRoute.snapshot.params['id']) {
          this.referencePictureId = this._avRoute.snapshot.params['id'];
      }
      this.addReferencePictureForm = this._fb.group({
          pictureId: 0,
          pictureUrl: ['', [Validators.required]]
      });
  }

  ngOnInit() {
  }

  save() {
      if (!this.addReferencePictureForm.valid) {
          return;
      }
      if (this.title === 'Referenciakép felvétele') {
          this._referencePictureService.createReferencePicture(this.addReferencePictureForm.value)
              .subscribe((data) => {
                  this._router.navigate(['/about-us']);
              }, error => this.errorMessage = error);
      }
  }
  cancel() {
      this._router.navigate(['/about-us']);
  }
  get pictureUrl() { return this.addReferencePictureForm.get('pictureUrl');
}

}
