import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricTypeService } from '../services/fabric-type.service';

@Component({
  selector: 'app-add-fabric-type',
  templateUrl: './add-fabric-type.component.html',
  styleUrls: ['./add-fabric-type.component.css']
})
export class AddFabricTypeComponent implements OnInit {
  addFabricTypeForm: FormGroup;
  title = 'Szövettípus felvétele';
  errorMessage: any;
  fabricTypeId: number;

  constructor(private _fb: FormBuilder,
      private _avRoute: ActivatedRoute, private _fabricTypeService: FabricTypeService,
      private _router: Router) {
      if (this._avRoute.snapshot.params['id']) {
          this.fabricTypeId = this._avRoute.snapshot.params['id'];
      }
      this.addFabricTypeForm = this._fb.group({
          fabricTypeId: 0,
          name: ['', [Validators.required]],
      });
  }

  ngOnInit() {
      if (this.fabricTypeId > 0) {
          this.title = 'Edit';
          this._fabricTypeService.getFabricTypeDetails(this.fabricTypeId)
              .subscribe(resp => this.addFabricTypeForm.setValue(resp),
                  error => this.errorMessage = error);
      }
  }
  save() {
      if (!this.addFabricTypeForm.valid) {
          return;
      }
      if (this.title === 'Szövettípus felvétele') {
          this._fabricTypeService.createFabricType(this.addFabricTypeForm.value)
              .subscribe((data) => {
                  this._router.navigate(['/fabrics']);
              }, error => this.errorMessage = error);
      } else if (this.title === 'Edit') {
          this._fabricTypeService.updateFabricType(this.addFabricTypeForm.value)
              .subscribe((data) => {
                  this._router.navigate(['/fabrics']);
              }, error => this.errorMessage = error);
      }
  }
  cancel() {
      this._router.navigate(['/admin-area']);
  }
  get name() { return this.addFabricTypeForm.get('name'); }

}
