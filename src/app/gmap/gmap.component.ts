import { Component, OnInit, NgModule } from '@angular/core';
import {AgmCoreModule} from '@agm/core'
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
    latitude= 51.678418;
    longitude=7.809007;
  constructor() { }

  ngOnInit() {
  }
  

}
