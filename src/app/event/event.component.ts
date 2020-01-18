import {Component, OnInit, Inject, ViewChild, ElementRef, NgZone, NgModule} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import {MapsAPILoader} from '@agm/core';
import {UploadService} from '../services/upload.service';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
// import {google} from '@agm/core/services/google-maps-types';
// import {} from 'googlemaps';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {
  name;
  description;
  startdate;
  enddate;
  starttime;
  eventcreatedby;
  eventid;
  enteraddress;



  inputFile;
  filename='Add New Event Photo';
  uid;
  photoURL = '../../assets/images/default-profile.jpg';



  latitude: number;
  longitude: number;
  zoom: number;
  address='';
  private geoCoder;

  eventForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    startdate: new FormControl('', [
      Validators.required

    ]),
    enteraddress: new FormControl('', [
      Validators.required

    ]),

    enddate: new FormControl('', [
      Validators.required
    ]),
    starttime: new FormControl('', [
      Validators.required
    ])
  });

  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;


  constructor (
    private userService:UserService,
    private auth: AuthService,
    private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
                private uploadService:UploadService) { }
  openDialog () {
    console.log('The dialog was closed')
  }

  // openDialog(): void {
  //   const dialogRef = MatDialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: {name: this.name, animal: this.animal}
  //   });
  //   console.log('The dialog was closed');

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  ngOnInit () {
    this.auth.getAuthState().subscribe(currUser=>{
      if(currUser){
        this.uid=currUser.uid;
      }
    });
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


  // markerDragEnd($event: MouseEvent) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          if(this.address=''){
            this.address='';
          }else{
            console.log("entered");
            this.address = results[0].formatted_address;
          }

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  saveEvent(){

  console.log("start date"+this.startdate);
  console.log("end date"+this.enddate);
  console.log("address"+this.address);


  }
  processImage(event) {
    this.inputFile = event.target.files[0];
    this.filename = this.inputFile.name;
    if (this.inputFile.size > 2000000) {
      this.filename = 'Max Filesize 2Mb!';
    } else {
      if (this.filename.length > 25) {
        this.filename = this.filename.slice(0, 25) + '...' + this.filename.slice(this.filename.length - 3);
      }
      this.uploadService.pushUpload(this.inputFile, 'user', this.uid);
    }
  }


}


// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })

// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
