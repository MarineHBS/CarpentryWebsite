import { Component, OnInit } from '@angular/core';
import { Fabric } from '../models/fabric';
import { FabricType } from '../models/fabric-type';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FabricTypeService } from '../services/fabric-type.service';
import { FabricService } from '../services/fabric.service';
import { UserService } from '../services/user.service';
import { Picture } from '../models/picture';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.css']
})
export class FabricComponent implements OnInit {
  fabrics: Fabric[];
  fabricTypes: FabricType[];
  fabricPictures: Picture[];
  fabricsWithIds: Map<FabricType, Fabric[]> = new Map();
  fabricsWithUrls: Map<string, string> = new Map();
  public adminFlag: boolean;

  constructor(public http: Http, private _router: Router, private _fabricTypeService: FabricTypeService,
    private _fabricService: FabricService, private _userService: UserService) {
    this.adminFlag = this._userService.isAdmin();
  }

  ngOnInit() {
    this.initializeVariables();
  }

  addFabricsToFabricsMap(type: FabricType) {
    this.fabricsWithIds.set(type, this.fabrics
      .filter(x => x.fabricTypeId === type.fabricTypeId));
  }

  initializeVariables() {
    this._fabricService.getFabrics().subscribe(
      fabrics => {
        this.fabrics = fabrics;
        this._fabricTypeService.getFabricTypes().subscribe(
          types => {
            this.fabricTypes = types;
            for (const type of types) {
              this.addFabricsToFabricsMap(type);
            }
            this._fabricService.getFabricsPictureUrl().subscribe(
              pictures => {
                this.fabricPictures = pictures;
                for (const fabric of fabrics) {
                  this.fabricsWithUrls.set(fabric.fabricId, this.fabricPictures
                    .filter(pic => pic.pictureId === fabric.pictureId)[0].pictureUrl);
                }
              });
          });

      });
  }

  getFabricUrlById(id: string) {
    return this.fabricsWithUrls.get(id);
  }

  getFabricsByTypeId(type: FabricType) {
    return this.fabricsWithIds.get(type);
  }

}
