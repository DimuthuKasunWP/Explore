import { Component, OnInit, NgModule, Input } from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentBuilder } from 'firebase-functions/lib/providers/firestore';
import { EventsService } from '../services/events.service';
import { appendFileSync } from 'fs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';


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
   
    @Input() originlat;
    @Input() originlng;
    @Input() uid;
    @Input() eid;
    currlat;
    currlng;
    
   lat:Number;
   lng:Number;
   
    
    origin = { 
    //   lat:parseFloat(this.currlat),
    lat:6.927079,
    //   lng:parseFloat(this.currlng)
    lng:79.861244
      };

    destination = { 
    lat:Number(this.finallatitude),
    //lat:7.291418,
     lng:Number(this.finallongitude)
    //lng:80.636696
    };

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;

  }
  constructor(
    private afs: AngularFirestore,
    private auth:AuthService
    
  ) {
    console.log("this is origin"+this.currlat);
   }

  ngOnInit() {
    
    this.auth.getAuthState().subscribe(currUser=>{
      if(currUser){
        this.uid=currUser.uid;
      }

       this.afs.collection('events/' + this.eid + '/members').valueChanges().subscribe(member=>{
        if(member){
          //@ts-ignore
          this.currlat=member[0].currlat;
          //@ts-ignore
          this.currlng=member[0].currlng;
          //@ts-ignore
          console.log("this is inside oninit"+member[0].currlng);
          //this.origin = { 
            //@ts-ignore
           // lat:parseFloat(member[0].currlat),
            //@ts-ignore
            //lng:parseFloat(member[0].currlng)
           //};
            //@ts-ignore
          console.log("fuck"+member[0].currlat);
        }
       });
       console.log("eid is"+this.eid);
       console.log("uid is"+this.uid);
    });
   

    
    
  }
  getDirection() {
   
   
    
  }



}
