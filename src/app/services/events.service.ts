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
  photoURL;
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
        this.afs.doc('users/' + data.admin + '/events/' + eid).set(euserdata).then(() => this.router.navigateByUrl('events/' + eid));//user->events
        const ueventdata = {
          uid: data.admin,
          date: firebase.firestore.FieldValue.serverTimestamp()
        };
        this.afs.doc('events/' + eid + '/members/' + data.admin).set(ueventdata);//subcribe or unsubcribe 
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
  editEvent(data) {
    const EData = {
      name: data.gname,
      desc: data.desc,
    };
    return this.afs.doc('events/' + data.eid).update(EData);
  }
  subscribe(eid) {
    this.auth.getAuthState().subscribe(currentuser => {
      if (currentuser) {
        const uid = currentuser.uid;
        const data = {
          uid: uid,
          date: firebase.firestore.FieldValue.serverTimestamp()
        };
        this.afs.doc('events/' + eid + '/members/' + uid).set(data);
      }
    });
  }
  unsubscribe(eid) {
    this.auth.getAuthState().subscribe(currentuser => {
      if (currentuser) {
        const uid = currentuser.uid;
        this.afs.doc('events/' + eid + '/members/' + uid).delete();
      }
    });
  }

  getEvent(eid){
    return this.afs.doc<Event>('events/' + eid).valueChanges();
  }
  getEventList(){
    return this.afs.collection("events").valueChanges();
  }

  getmembers(eid){
    return this.afs.collection('groups/' + eid + '/members', ref => ref.orderBy('date')).valueChanges();
  }

  updateBannerURL(url, gid) {
    const data = {
      bannerURL: url
    };
    this.afs.doc('groups/' + gid).update(data)
      .then(() => console.log('Group banner updated'));
  }


  getFeed(eid) {
    return this.afs.collection('posts/' , ref => ref.where('to', '==', eid)).valueChanges();
  }

  getMembers(eid) {
    return this.afs.collection('events/' + eid + '/members', ref => ref.orderBy('date')).valueChanges();
  }

  getMostSubbed() {
    return this.afs.collection('events', ref => ref.orderBy('totalMembers', 'desc')).valueChanges();
  }
}

