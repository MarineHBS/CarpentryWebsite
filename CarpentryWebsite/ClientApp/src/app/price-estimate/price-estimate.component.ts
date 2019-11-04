import { Component, OnInit, Output } from '@angular/core';
import { FabricType } from '../models/fabric-type';
import { CarpentryServiceType } from '../models/carpentry-service-type';
import { Fabric } from '../models/fabric';
import { CarpentryService } from '../models/carpentry-service';
import { CarpentryServiceService } from '../services/carpentry-service.service';
import { FabricService } from '../services/fabric.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricTypeService } from '../services/fabric-type.service';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';
import { EventEmitter } from '@angular/core';
import { Picture } from '../models/picture';

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
  currentFabric: Fabric;
  carpentryServices: CarpentryService[];
  carpentryServiceTypeList: CarpentryServiceType[];
  currentCarpentryServicePrice: number;
  carpentryServiceTypeId: string;
  carpentryServicesWithIds: Map<CarpentryServiceType, CarpentryService[]> = new Map();
  showEstimate: boolean;
  size: number;
  hour: number;
  showInputData = false;
  fabricSelected = false;
  fabricsWithUrls: Map<string, string> = new Map();
  fabricPictures: Picture[];

  currentFabricPictureUrl: string;

  priceEstimateResult: number;

  @Output()
  priceEstimateResultEvent: EventEmitter<number> = new EventEmitter();
  @Output()
  needNewComponentEvent: EventEmitter<boolean> = new EventEmitter();
  showError = false;
  selectedIndex = -1;

  // the list to be shown after filtering
  filteredList: FabricType[] = [];

  constructor(private _avRoute: ActivatedRoute, private _fabricTypeService: FabricTypeService,
    private _fabricService: FabricService, private _router: Router, private _carpentryServiceTypeService: CarpentryServiceTypeService,
    private _carpentryServiceService: CarpentryServiceService) { }

  ngOnInit() {
    this._fabricTypeService.getFabricTypes().subscribe(
    types => {
      this.fabricTypes = types;
      this.filteredList = types;
      this._fabricService.getFabrics().subscribe(
        fabrics => {
          this.fabrics = fabrics;
          for (const type of types) {
            this.addFabricsToFabricsMap(type);
          }
          this._fabricService.getFabricsPictureUrl().subscribe(
            pictures => {
              this.fabricPictures = pictures;
              for (const fabric of fabrics) {
                this.fabricsWithUrls.set(fabric.fabricId, this.fabricPictures
                  .filter(pic => pic.pictureId === fabric.pictureId)[0].pictureName);
              }
            });
        });
    });

    this._carpentryServiceTypeService.getCarpentryServiceTypes().subscribe(
      types => {
        this.carpentryServiceTypeList = types;
        this._carpentryServiceService.getCarpentryServices().subscribe(
          services => {
            this.carpentryServices = services;
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
    return this.fabricsWithIds.get(this.fabricTypes.find(x => x.fabricTypeId === type));
  }

  addServicesToCarpentryServicesMap(type: CarpentryServiceType) {
    this.carpentryServicesWithIds.set(type, this.carpentryServices
      .filter(x => x.carpentryServiceTypeId === type.carpentryServiceTypeId));
  }

  getCarpentryServicesByTypeId(type: number) {
    return this.carpentryServicesWithIds.get(this.carpentryServiceTypeList.find(x => x.carpentryServiceTypeId === type));
  }

  assignPictureSrc(fabric: Fabric) {
    this.fabricSelected = true;
  }

  calculateEstimate() {
    this.currentFabricPrice = this.currentFabric.price;
    this.showEstimate = true;
    this.priceEstimateResult = this.currentCarpentryServicePrice + this.currentFabricPrice * this.size;
    this.priceEstimateResultEvent.emit(this.priceEstimateResult);
  }

  showInput() {
    this.showInputData = true;
    this.needNewComponentEvent.emit(true);
  }

  getFabricUrlById(id: string) {
    return this.fabricsWithUrls.get(id);
  }

}
