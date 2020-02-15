import { Injectable } from '@angular/core';
import {FormControl,FormGroup, FormControlName,Validators}from '@angular/forms'
import { from } from 'rxjs';
import{AngularFireDatabase,AngularFireList} from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class MarkersService {
  

  constructor(private firebase: new AngularFireDatabase) {}
      
  markerslist:AngularFireList<any>;

      form = new FormGroup({
      $key :new FormControl(null),
      markerName: new FormControl('',Validators.required),
      eventID: new FormControl(''),
      location:new FormControl('',Validators.required),
      description:new FormControl(''),
    });

    getmarkers(){
      this.markerslist= this.firebase.list("markers");
      return this.markerslist.snapshotChanges();
    }

    insertmarker(marker){
      this.markerslist.push({
      markerName: marker.markerName,
      eventID: marker.eventID,
      location: marker.location,
      description: marker.description

      });
    }
}
