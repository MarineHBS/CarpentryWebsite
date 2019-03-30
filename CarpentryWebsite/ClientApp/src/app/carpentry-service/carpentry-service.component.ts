import { UserService } from './../services/user.service';
import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { CarpentryServiceType } from '../models/carpentry-service-type';
import { CarpentryService } from '../models/carpentry-service';
import { CarpentryServiceService } from '../services/carpentry-service.service';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';

@Component({
  selector: 'app-carpentry-service-component',
  templateUrl: './carpentry-service.component.html'
})

export class CarpentryServiceComponent implements OnInit {
  carpentryServices: CarpentryService[];
  carpentryServiceTypes: CarpentryServiceType[];
  carpentryServicesWithIds: Map<CarpentryServiceType, CarpentryService[]> = new Map();
  public adminFlag: boolean;

  constructor(public http: Http, private _router: Router, private _carpentryServiceTypeService: CarpentryServiceTypeService,
    private _carpentryServiceService: CarpentryServiceService, private _userService: UserService) {
    this.adminFlag = this._userService.isAdmin();
  }

  ngOnInit() {
    this.initializeVariables();
  }

  addServicesToCarpentryServicesMap(type: CarpentryServiceType) {
    this.carpentryServicesWithIds.set(type, this.carpentryServices
      .filter(x => x.carpentryServiceTypeId === type.carpentryServiceTypeId));
  }

  initializeVariables() {
    this._carpentryServiceService.getCarpentryServices().subscribe(
      services => {
        this.carpentryServices = services;
        this._carpentryServiceTypeService.getCarpentryServiceTypes().subscribe(
          types => {
            this.carpentryServiceTypes = types;
            for (const type of types) {
              this.addServicesToCarpentryServicesMap(type);
            }
          });

      });
  }

  getCarpentryServices() {
    this._carpentryServiceService.getCarpentryServices().subscribe(
      services => this.carpentryServices = services
    );
  }

  getCarpentryServiceTypes() {
    this._carpentryServiceTypeService.getCarpentryServiceTypes().subscribe(
      types => {
        this.carpentryServiceTypes = types;
        for (const type of this.carpentryServiceTypes) {
          this.addServicesToCarpentryServicesMap(type);
        }
      });
  }

  getCarpentryServicesByTypeId(type: CarpentryServiceType) {
    return this.carpentryServicesWithIds.get(type);
  }
}

