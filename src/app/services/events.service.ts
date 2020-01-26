import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';

interface Event {
  createDate;
  eid: string;
  admin?:string,
  latitude;
  longitude;
  address;
  name:string;
  gid:string;
  description:string;
  startdate;
  enddate;
  starttime;
}

@Injectable()
export class EventsService {
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private auth: AuthService
  ) {
  }


  createEvent(data){
    console.log("entered to the event service createevent method");
    const  eid=this.afs.createId();
    const edata={
      createDate: firebase.firestore.FieldValue.serverTimestamp(),
      eid: eid,
      admin:data.admin,
      latitude:data.latitude,
      longitude:data.longitude,
      address:data.address,
      name:data.name,
      gid:'g001',
      description:data.description,
      startdate:data.startdate,
      enddate:data.enddate,
      starttime:data.starttime
    }
    this.afs.doc('events/' + eid).set(edata).then(() => {
      this.auth.getAuthState().subscribe(user => {
        const euserdata = {
          eid: eid,
          last: firebase.firestore.FieldValue.serverTimestamp()
        };
        this.afs.doc('users/' + data.admin + '/events/' + eid).set(euserdata).then(() => this.router.navigateByUrl('events/' + eid));
        const ueventdata = {
          uid: data.admin,
          date: firebase.firestore.FieldValue.serverTimestamp()
        };
        this.afs.doc('events/' + eid + '/members/' + data.admin).set(ueventdata);
        console.log("event created");
      });
    });

  }

  removeEvent(eid){
    this.afs.doc<any>('events/' + eid).delete();
  }
  updateEventData(data){
    const EData = {
      latitude:data.latitude,
      longitude:data.longitude,
      address:data.enteraddress,
      name:data.name,
      description:data.description,
      startdate:data.startdate,
      enddate:data.enddate,
      starttime:data.starttime
    };
    return this.afs.doc('events/' + data.eid).update(EData);
  }

  getEvent(eid){
    return this.afs.doc<Event>('events/' + eid).valueChanges();
  }
}

