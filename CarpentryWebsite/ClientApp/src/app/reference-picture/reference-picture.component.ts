import { Component, OnInit } from '@angular/core';
import { ReferencePicture } from '../models/reference-picture';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ReferencePictureService } from '../services/reference-picture.service';
import { PictureService } from '../services/picture.service';
import { Picture } from '../models/picture';

@Component({
  selector: 'app-reference-picture',
  templateUrl: './reference-picture.component.html',
  styleUrls: ['./reference-picture.component.css']
})
export class ReferencePictureComponent implements OnInit {
  referencePictures: Picture[];

  constructor(public http: Http, private _router: Router, private _referencePictureService: ReferencePictureService) {
    this.getReferencePictures();
  }

  ngOnInit() {
  }

  getReferencePictures() {
    this._referencePictureService.getReferencePicturesWithUrl().subscribe(
      referencePictures => {
        this.referencePictures = referencePictures;
      });
  }

}
