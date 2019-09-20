import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title = 'Carpentry location';
  lat = 47.49801;
  lng = 19.03991;

  constructor() { }

  ngOnInit() {
  }

}
