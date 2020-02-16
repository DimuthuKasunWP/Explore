import { Component, OnInit, NgModule, Input } from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentBuilder } from 'firebase-functions/lib/providers/firestore';

@Component({
  selector: 'gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
    latitude= 7.8774;
    longitude=80.7003;
    locationChosen = false;

    @Input() finallatitude;
    @Input() finallongitude;
    @Input() currlat;
    @Input() currlng;
    @Input() originlat;
    @Input() originlng;

    
    origin = { 
      originlat:this.originlat, 
      originlng:this.originlng
     };

    destination = { 
      currlat:this.currlat, 
      currlng:this.currlng };

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;

  }
  constructor() { }

  ngOnInit() {
  }
  getDirection() {
   
   
    
  }

}
