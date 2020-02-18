import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {MarkersService} from '../services/markers.service';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-addmarker',
  templateUrl: './addmarker.component.html',
  styleUrls: ['./addmarker.component.css']
})
export class AddmarkerComponent implements OnInit {
  constructor(private markerservice : MarkersService , private afs:AngularFirestore,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {}

  addMarker = new FormGroup(
    {
      markerName: new FormControl('',Validators.required),
      eventID: new FormControl('himash1997'),
      location:new FormControl(''),
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

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  // @ts-ignore
  @ViewChild('search')
  public searchElementRef: ElementRef;


  ngOnInit() {
    this.addMarker = new FormGroup(
      {
        markerName: new FormControl('',Validators.required),
        eventID: new FormControl('himash1997'),
        location:new FormControl('',Validators.required),
        description:new FormControl(''),
      }
    );

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });





  }


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    //@ts-ignore
    this.latitude = $event.coords.lat;
    //@ts-ignore
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
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
  if(!this.markerName.errors ){
    this.afs.collection("markers").add(
      val
    );
  }

}
}
