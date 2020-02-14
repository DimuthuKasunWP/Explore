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
    this.afs.collection<any>('/hashtags/' + this.name + '/posts/').doc(pid).set(data);
    let datas={
      hid:this.name
    };
    this.afs.collection<any>("/posts/"+pid+"/hashtags/").doc(this.name).set(datas);
  }
  gethashtagByPID(pid){
    return this.afs.collection("/posts/"+pid+"/hashtags/").valueChanges();
  }

}
