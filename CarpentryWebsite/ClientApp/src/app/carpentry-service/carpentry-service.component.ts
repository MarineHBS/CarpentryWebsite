import { UserService } from './../services/user.service';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { LocationService } from '../services/locationservice.service';
import { CarpentryServiceType } from '../models/carpentry-service-type';
import { CarpentryService } from '../models/carpentry-service';
import { CarpentryServiceService } from '../services/carpentry-service.service';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';
import { Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core';

@Pipe({name: 'message'})
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

export class CarpentryServiceComponent {
    carpentryServiceList: CarpentryService[];
    carpentryServiceTypeList: CarpentryServiceType[];
    public adminFlag: boolean;

    constructor(public http: Http, private _router: Router, private _carpentryServiceTypeService: CarpentryServiceTypeService,
      private _carpentryServiceService: CarpentryServiceService, private _userService: UserService) {
        // this.getCarpentryServices();
        this.getCarpentryServiceTypes();
        this.adminFlag = this._userService.isAdmin();
    }

    getCarpentryServices() {
      this._carpentryServiceService.getCarpentryServices().subscribe(
          services => this.carpentryServiceList = services
      );
    }

    getCarpentryServicesByTypeId(typeId: number) {
      this._carpentryServiceService.getCarpentryServicesByTypeId(typeId).subscribe(
        services => this.carpentryServiceList = services
      );
    }

    getCarpentryServiceTypes() {
      this._carpentryServiceTypeService.getCarpentryServiceTypes().subscribe(
          types => this.carpentryServiceTypeList = types
      );
  }
}

