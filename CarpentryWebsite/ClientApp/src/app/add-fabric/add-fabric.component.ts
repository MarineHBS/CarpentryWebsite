import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FabricType } from '../models/fabric-type';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricTypeService } from '../services/fabric-type.service';
import { FabricService } from '../services/fabric.service';

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

  constructor(private _fb: FormBuilder,
      private _avRoute: ActivatedRoute, private _fabricTypeService: FabricTypeService,
       private _fabricService: FabricService, private _router: Router) {
      if (this._avRoute.snapshot.params['id']) {
          this.fabricId = this._avRoute.snapshot.params['id'];
      }
      this.getFabricTypes();
      this.addFabricForm = this._fb.group({
          fabricId: 0,
          name: ['', [Validators.required]],
          price: ['', [Validators.required]],
          fabricTypeId: ['', [Validators.required]],
          picture: ['', [Validators.required]]
      });
  }

  ngOnInit() {
      if (this.fabricId > 0) {
          this.title = 'Edit';
          this._fabricService.getFabricDetails(this.fabricId)
              .subscribe(resp => this.addFabricForm.setValue(resp),
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
      if (this.title === 'Szövet felvétele') {
          this._fabricService.createFabric({fabricId: this.addFabricForm.value.fabricId,
            fabricTypeId: this.addFabricForm.value.fabricTypeId,
            name: this.addFabricForm.value.name,
            price: this.addFabricForm.value.price}, this.addFabricForm.value.picture)
              .subscribe((data) => {
                  this._router.navigate(['/fabrics']);
              }, error => this.errorMessage = error);
      } else if (this.title === 'Edit') {
          this._fabricService.updateFabric({fabricId: this.addFabricForm.value.fabricId,
            fabricTypeId: this.addFabricForm.value.fabricTypeId,
            name: this.addFabricForm.value.name,
            price: this.addFabricForm.value.price}, this.addFabricForm.value.picture)
              .subscribe((data) => {
                  this._router.navigate(['/fabrics']);
              }, error => this.errorMessage = error);
      }
  }
  cancel() {
      this._router.navigate(['/admin-area']);
  }
  get name() { return this.addFabricForm.get('name'); }
  get price() { return this.addFabricForm.get('price'); }
  get picture() { return this.addFabricForm.get('picture'); }
  get fabricTypeId() { return this.addFabricForm.get('fabricTypeId'); }
}
