import { Component, OnInit, Inject } from '@angular/core';
import { ReferencePicture } from '../models/reference-picture';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ReferencePictureService } from '../services/reference-picture.service';
import { PictureService } from '../services/picture.service';
import { Picture } from '../models/picture';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reference-picture',
  templateUrl: './reference-picture.component.html',
  styleUrls: ['./reference-picture.component.css']
})
export class ReferencePictureComponent implements OnInit {
  referencePictures: Picture[];
  adminFlag: boolean;

  constructor(public http: Http, private _router: Router, @Inject('BASE_URL') baseUrl: string,
    private _referencePictureService: ReferencePictureService, private _userService: UserService) {
    this.getReferencePictures();
    this.adminFlag = this._userService.isLoggedIn();
    console.log('BASEURLLLLLLLLLLLLLLLLLL' + baseUrl);
  }

  ngOnInit() {
  }

  getReferencePictures() {
    this._referencePictureService.getReferencePicturesWithUrl().subscribe(
      referencePictures => {
        this.referencePictures = referencePictures;
      });
  }

  delete(referencePictureId) {
    console.log(referencePictureId);
    const confirmation = confirm('Biztosan törölni szeretné ezt a képet?' + referencePictureId);
    if (confirmation) {
      this._referencePictureService.deleteReferencePicture(referencePictureId)
          .subscribe(data => this.getReferencePictures());
    }
  }

}
