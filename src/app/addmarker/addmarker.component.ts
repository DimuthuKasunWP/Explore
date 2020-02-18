import { Component, OnInit } from '@angular/core';
import {MarkersService} from '../services/markers.service';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-addmarker',
  templateUrl: './addmarker.component.html',
  styleUrls: ['./addmarker.component.css']
})
export class AddmarkerComponent implements OnInit {
  constructor(private markerservice : MarkersService , private afs:AngularFirestore) {}

  addMarker = new FormGroup(
    {
      markerName: new FormControl('',Validators.required),
      eventID: new FormControl('himash1997'),
      location:new FormControl('',Validators.required),
      description:new FormControl(''),
    }
  );

  get markerName()
  {
    return this.addMarker.get("markerName");
  }
  get location()
  {
    return this.addMarker.get("location");
  }

  submitted;
  formcontrols=this.markerservice.form.controls;
  enteraddress;

  ngOnInit() {
    this.addMarker = new FormGroup(
      {
        markerName: new FormControl('',Validators.required),
        eventID: new FormControl('himash1997'),
        location:new FormControl('',Validators.required),
        description:new FormControl(''),
      }
    );
  }
onSubmit(val){
  // this.submitted=true;
  // if(this.markerservice.form.valid){
  // if(this.markerservice.form.get('$key').value==null){
  //   this.markerservice.insertmarker(this.markerservice.form.value)
  // }

  //   this.submitted=false;
  // }
  console.log(val);
  if(!this.markerName.errors && !this.location.errors){
    this.afs.collection("markers").add(
      val
    );
  }
  
}
}
