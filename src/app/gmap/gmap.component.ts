import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
  latitude = 7.8774;
  longitude = 80.7003;
  locationChosen = false;


  @Input() finallatitude;
  @Input() finallongitude;
  @Input() uid;
  @Input() eid;


  currlat;
  currlng;
  originlat;
  originlng;

  lat: Number;
  lng: Number;

  origin;


  // origin = {
  // //   lat:parseFloat(this.currlat),
  // lat:this.lat2,
  // //   lng:parseFloat(this.currlng)
  // lng:this.lng2
  //   };

  // destination = {
  // lat:this.lat1,
  // //lat:7.291418,
  //  lng:this.lng1
  // //lng:80.636696
  // };

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    console.log('this is origin' + this.currlat);
  }

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;

  }

  ngOnInit() {

    this.auth.getAuthState().subscribe(currUser => {
      if (currUser) {
        this.uid = currUser.uid;
      }
      setTimeout(() => {
        this.getLocation(this.uid);
      }, 10000);
    });


  }

  getLocation(uid) {
    this.afs.collection('events/' + this.eid + '/members').doc(uid).valueChanges().subscribe(member => {
        if (member) {

          // @ts-ignore
          console.log('this is member' + member.currlat);
          //@ts-ignore
          this.currlat = member.currlat;
          //@ts-ignore
          this.currlng = member.currlng;
          //@ts-ignore
          this.originlat = member.originlat;
          //@ts-ignore
          this.originlng = member.originlng;


          // this.origin = {
          //   //@ts-ignore
          //  lat:this.lat2,
          //   //@ts-ignore
          //  lng:this.lng2
          //  };


        }
      }
    );


  }


}
