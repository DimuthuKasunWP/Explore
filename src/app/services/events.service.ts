import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';



@Injectable()
export class EventsService {
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private auth: AuthService
  ) {
  }

  createEvent(data){
    const  eid=this.afs.createId();
    const edata={
      createDate: firebase.firestore.FieldValue.serverTimestamp(),
      eid: eid,
      admin:data.uid,
      latitude:data.latitude,
      longitude:data.longitude,
      address:data.enteraddress,
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
        this.afs.doc('users/' + data.uid + '/events/' + eid).set(euserdata).then(() => this.router.navigateByUrl('events/' + eid));
        const ueventdata = {
          uid: data.uid,
          date: firebase.firestore.FieldValue.serverTimestamp()
        };
        this.afs.doc('events/' + eid + '/members/' + data.uid).set(ueventdata);
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

