import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';



@Injectable()
export class HashtagService {
name;
hid;
  constructor(
    private afs: AngularFirestore

  ) { }

  sethashtag(data){
    this.hid=data.hid;
    this.name=data.name;
    let details={
      hid:this.hid,
      name:this.name
    }
    this.afs.doc('hashtags/' + this.name).set(details);

  }
  setposttoHashtag(pid){
    let data={
      pid:pid
    };
    this.afs.collection<any>('/hashtags/' + this.name + '/posts').doc(pid).set(data);
  }

}
