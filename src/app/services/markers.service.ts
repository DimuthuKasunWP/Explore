import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {


  markerslist: AngularFireList<any>;
  form = new FormGroup({
    $key: new FormControl(null),
    markerName: new FormControl('', Validators.required),
    eventID: new FormControl(''),
    location: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(private firebase: AngularFireDatabase) {
  }

  getmarkers() {
    this.markerslist = this.firebase.list('markers');
    return this.markerslist.snapshotChanges();
  }

  insertmarker(marker) {
    this.markerslist.push({
      markerName: marker.markerName,
      eventID: marker.eventID,
      location: marker.location,
      description: marker.description

    });
  }
}
