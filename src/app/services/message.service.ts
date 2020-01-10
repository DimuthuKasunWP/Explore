import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable()
export class MessageService {
room;
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) { }

  getChatrooms(uid) {
    return this.afs.collection('/users/' + uid + '/messaging', ref => ref.orderBy('lastUpdate', 'desc')).valueChanges();
  }

  checkChatroom(profileuid) {
    this.auth.getAuthState().subscribe(curruser => {
      const currentuid = curruser.uid;
      this.afs.collection('users/' + curruser.uid + '/messaging', ref => ref.where('uid', '==', profileuid)).valueChanges()
      .subscribe(chatroom => {
        if (chatroom.length === 1) {
          console.log('open chatroom modal');
        } else {
          this.createChatroom(profileuid);
        }
      });
    });
  }

  clearUnread(rid) {
    this.auth.getAuthState().subscribe(curruser => {
      if (curruser) {
        this.afs.doc('users/' + curruser.uid + '/messaging/' + rid).update({unread: false});
      }
    });
  }

  getChatroomFromRID(rid, uid) {
    return this.afs.doc('users/' + uid + '/messaging/' + rid).valueChanges();
  }

  createChatroom(profileuid) {
    this.auth.getAuthState().subscribe(
      curruser => {
        const rid = this.afs.createId();

        console.log("room id created");
        const roomData = {
          rid: rid,
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        };
        this.room=roomData;
        this.afs.doc('messaging/' + rid).set(roomData)
        .then(() => {
          let data = {
            uid: profileuid
          };
          this.afs.doc('messaging/' + curruser.uid + '/users/' + profileuid).set(data);
          data = {
            uid: curruser.uid
          };
          this.afs.doc('messaging/' + profileuid + '/users/' + curruser.uid).set(data);
        });
      });
  }

  getUnread(uid) {
    return this.afs.collection('users/' + uid + '/messaging', ref => ref.where('unread', '==', true)).valueChanges();
  }

  getMessages(rid) {
    return this.afs.collection('messaging/' + rid + '/messages', ref => ref.orderBy('timestamp')).valueChanges();
  }

  sendMessage(msgData) {
    this.auth.getAuthState().subscribe(curruser => {
      const mid = this.afs.createId();
      const msg = {
        mid: mid,
        rid: msgData.rid,
        uid: curruser.uid,
        text: msgData.text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };
      this.afs.doc('messaging/' + msgData.uid + '/messages/' + mid).set(msg);
      this.afs.doc('messaging/' + mid+ '/messages/' + msgData.uid).set(msg);
    });
  }

  getChatroom(profileuid, currentuid) {
    //console.log("profile uid and current uid"+profileuid+"helloo"+currentuid);
    return this.afs.collection('messaging/' + currentuid + '/users', ref => ref.where('uid', '==', profileuid)).valueChanges();
  }
}
