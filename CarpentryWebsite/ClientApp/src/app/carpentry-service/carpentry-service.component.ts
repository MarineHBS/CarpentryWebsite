import { UserService } from './../services/user.service';
import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { LocationService } from '../services/locationservice.service';
import { CarpentryServiceType } from '../models/carpentry-service-type';
import { CarpentryService } from '../models/carpentry-service';
import { CarpentryServiceService } from '../services/carpentry-service.service';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';
import { Directive, Output, EventEmitter, Input, SimpleChange } from '@angular/core';

@Pipe({ name: 'message' })
export class MessagePipe implements PipeTransform {
  transform(msg: string): string {
    console.log('Run the pipe');
    return msg;
  }
}


@Component({
  selector: 'app-carpentry-service-component',
  templateUrl: './carpentry-service.component.html'
})

export class CarpentryServiceComponent implements OnInit {
  carpentryServices: CarpentryService[];
  currentCarpentryServices: CarpentryService[];
  carpentryServiceTypes: CarpentryServiceType[];
  public adminFlag: boolean;

  constructor(public http: Http, private _router: Router, private _carpentryServiceTypeService: CarpentryServiceTypeService,
    private _carpentryServiceService: CarpentryServiceService, private _userService: UserService) {
    this.adminFlag = this._userService.isAdmin();
  }

  ngOnInit() {
    this.getCarpentryServices();
    this.getCarpentryServiceTypes();
  }

  getCarpentryServices() {
    this._carpentryServiceService.getCarpentryServices().subscribe(
      services => this.carpentryServices = services
    );
  }

  getCarpentryServiceTypes() {
    this._carpentryServiceTypeService.getCarpentryServiceTypes().subscribe(
      types => this.carpentryServiceTypes = types
    );
  }

  getCarpentryServicesByTypeId(typeId: number) {
    console.log(this.carpentryServices.pop());
    this.currentCarpentryServices = this.carpentryServices
      .filter(x => x.carpentryServiceTypeId === typeId);
    console.log(this.currentCarpentryServices.find(x => x.carpentryServiceTypeId === typeId));
    // console.log(this.carpentryServices);
    console.log(this.currentCarpentryServices);
    /*
    this._carpentryServiceService.getCarpentryServicesByTypeId(typeId).subscribe(
      services => this.carpentryServiceList = services
    );*/
  }
}

