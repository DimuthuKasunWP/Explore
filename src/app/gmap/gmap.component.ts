import { Component, OnInit, NgModule } from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
    latitude= 7.8774;
    longitude=80.7003;
    locationChosen = false;

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }
  constructor() { }

  ngOnInit() {
  }
  

}
