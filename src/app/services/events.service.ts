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
      gid:data.gid,
      description:data.description,
      startdate:data.startdate,
      enddate:data.enddate,
      starttime:data.starttime,
      photoURL:'https://xplore-1.firebaseapp.com/assets/images/default-profile.jpg'
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
        this.afs.doc('events/' + eid + '/members/' + data.admin).set(ueventdata).then(()=>{
          this.router.navigateByUrl('home');
        });
        console.log("event created");
      });
    });

  }

  removeEvent(eid){
    this.afs.doc<any>('events/' + eid).delete();
  }

  updateEventData(data){
    console.log("this is inside update event data"+data.address);
    const EData = {
      latitude:data.latitude,
      longitude:data.longitude,
      address:data.address,
      name:data.name,
      gid:data.gid,
      description:data.description,
      startdate:data.startdate,
      enddate:data.enddate,
      starttime:data.starttime,
      photoURL:data.photoURL
    };
    return this.afs.doc('events/' + data.eid).update(EData).then(()=>{
      this.router.navigateByUrl('home');
    });
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
  deleteEvent(eid){
    this.afs.doc('events/'+eid).delete();
  }
}

