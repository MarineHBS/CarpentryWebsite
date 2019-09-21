import { Component, OnInit, Output } from '@angular/core';
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
import { EventEmitter } from '@angular/core';

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
  size: number;
  hour: number;
  showInputData = false;

  priceEstimateResult: number;

  @Output()
  priceEstimateResultEvent: EventEmitter<number> = new EventEmitter();
  @Output()
  needNewComponentEvent: EventEmitter<boolean> = new EventEmitter();

  list: string[] = [ 'cica', 'kutya'];
  // two way binding for input text
  inputItem = '';
  // enable or disable visiblility of dropdown
  listHidden = true;
  showError = false;
  selectedIndex = -1;

  // the list to be shown after filtering
  filteredList: FabricType[] = [];

  constructor(private _avRoute: ActivatedRoute, private _fabricTypeService: FabricTypeService,
    private _fabricService: FabricService, private _router: Router, private _carpentryServiceTypeService: CarpentryServiceTypeService,
    private _carpentryServiceService: CarpentryServiceService, private dialogRef: MatDialog) { }

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

  calculateEstimate(priceEstimateResult: number) {
    this.showEstimate = true;
    this.priceEstimateResult = this.currentCarpentryServicePrice + this.currentFabricPrice * this.size;
    this.priceEstimateResultEvent.emit(this.priceEstimateResult);
  }

  onClose() {
    this.dialogRef.closeAll();
  }

  showInput() {
    this.showInputData = true;
    this.needNewComponentEvent.emit(true);
  }

  // modifies the filtered list as per input
  getFilteredList() {

    this.listHidden = false;
    // this.selectedIndex = 0;
  }

  // select highlighted item when enter is pressed or any item that is clicked
  selectItem(ind) {

    this.inputItem = this.filteredList[ind].name;
    this.listHidden = true;
    this.selectedIndex = ind;
  }

  // navigate through the list of items
  onKeyPress(event) {

    if (!this.listHidden) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      }

      if (event.key === 'Enter') {

        this.toggleListDisplay(0);
      }
      if (event.key === 'ArrowDown') {

        this.listHidden = false;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;

        if (this.filteredList.length > 0 && !this.listHidden) {

          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {

    if (sender === 1) {
      // this.selectedIndex = -1;
      this.listHidden = false;
      this.getFilteredList();
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        this.selectItem(this.selectedIndex);
        this.listHidden = true;
      }, 500);
    }
  }

}
