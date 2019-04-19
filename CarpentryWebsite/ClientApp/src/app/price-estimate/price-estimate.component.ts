import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FabricType } from '../models/fabric-type';
import { CarpentryServiceType } from '../models/carpentry-service-type';
import { Fabric } from '../models/fabric';
import { CarpentryService } from '../models/carpentry-service';
import { CarpentryServiceService } from '../services/carpentry-service.service';
import { FabricService } from '../services/fabric.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricTypeService } from '../services/fabric-type.service';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';

@Component({
  selector: 'app-price-estimate',
  templateUrl: './price-estimate.component.html',
  styleUrls: ['./price-estimate.component.css']
})
export class PriceEstimateComponent implements OnInit {
  fabrics: Fabric[];
  fabricTypes: FabricType[];
  fabricsWithIds: Map<FabricType, Fabric[]> = new Map();
  currentFabricPrice: number;
  carpentryServices: CarpentryService[];
  carpentryServiceTypeList: CarpentryServiceType[];
  currentCarpentryServicePrice: number;
  carpentryServiceTypeId: string;
  carpentryServicesWithIds: Map<CarpentryServiceType, CarpentryService[]> = new Map();
  showEstimate: boolean;
  priceEstimateResult: number;
  size: number;
  hour: number;

  constructor(private _avRoute: ActivatedRoute, private _fabricTypeService: FabricTypeService,
    private _fabricService: FabricService, private _router: Router, private _carpentryServiceTypeService: CarpentryServiceTypeService,
    private _carpentryServiceService: CarpentryServiceService, private dialogRef: MatDialog) { }

  ngOnInit() {
     this._fabricService.getFabrics().subscribe(
      fabrics => {
        this.fabrics = fabrics;
        this._fabricTypeService.getFabricTypes().subscribe(
          types => {
            this.fabricTypes = types;
            for (const type of types) {
              this.addFabricsToFabricsMap(type);
            }
          });
      });

    this._carpentryServiceService.getCarpentryServices().subscribe(
      services => {
        this.carpentryServices = services;
        this._carpentryServiceTypeService.getCarpentryServiceTypes().subscribe(
          types => {
            this.carpentryServiceTypeList = types;
            for (const type of types) {
              this.addServicesToCarpentryServicesMap(type);
            }
          });

      });
  }

  addFabricsToFabricsMap(type: FabricType) {
    this.fabricsWithIds.set(type, this.fabrics
      .filter(x => x.fabricTypeId === type.fabricTypeId));
  }
  getFabricsByTypeId(type: number) {
    this.fabrics = this.fabricsWithIds.get(this.fabricTypes.find(x => x.fabricTypeId === type));
    // return this.fabricsWithIds.get(type);
  }

  getCarpentryServicesByTypeId(type: number) {
    this.carpentryServices = this.carpentryServicesWithIds.get(this.carpentryServiceTypeList.find(x => x.carpentryServiceTypeId === type));
    // return this.carpentryServices;
  }

  addServicesToCarpentryServicesMap(type: CarpentryServiceType) {
    this.carpentryServicesWithIds.set(type, this.carpentryServices
      .filter(x => x.carpentryServiceTypeId === type.carpentryServiceTypeId));
  }

  calculateEstimate() {
    console.log('Calculating..');
    this.showEstimate = true;
    this.priceEstimateResult = this.currentCarpentryServicePrice * this.hour + this.currentFabricPrice * this.size;
  }

  onClose() {
    this.dialogRef.closeAll();
  }

}
