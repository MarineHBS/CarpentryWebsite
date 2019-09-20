import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  homepageImages: (string | IImage)[] = [
    { url: '../../assets/homepage_images/homepage_picture_2.jpg' },
    { url: '../../assets/homepage_images/homepage_picture_3.jpg' },
    { url: '../../assets/homepage_images/homepage_picture_4.jpg' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
