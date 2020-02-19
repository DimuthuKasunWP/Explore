import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';

@Injectable()
export class MessageService {
  room;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
  }

  getChatrooms(uid) {
    return this.afs.collection('/messaging/' + uid + '/users').valueChanges();
  }

  // checkChatroom(profileuid) {
  //   this.auth.getAuthState().subscribe(curruser => {
  //     const currentuid = curruser.uid;
  //     this.afs.collection('messaging/' + curruser.uid + '/users', ref => ref.where('uid', '==', profileuid)).valueChanges()
  //     .subscribe(chatroom => {
  //       if (chatroom.length === 1) {
  //         console.log('open chatroom modal');
  //       } else {
  //         this.createChatroom(profileuid);
  //       }
  //     });
  //   });
  // }

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

  createChatroom(profileuid, rid) {
    this.auth.getAuthState().subscribe(
      curruser => {
        console.log('this is in message' + rid);

        const roomData = {
          rid: rid,
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        };
        this.room = roomData;
        console.log('this is room data dd' + this.room);
        this.afs.doc('messaging/' + profileuid).set(roomData)
          .then(() => {
            let data = {
              uid: profileuid,
              rid: this.room.rid
            };
            this.afs.doc('messaging/' + profileuid + '/users/' + curruser.uid).set(data);
            data = {
              uid: curruser.uid,
              rid: this.room.rid
            };
            this.afs.doc('messaging/' + curruser.uid + '/users/' + profileuid).set(data);
          });
        console.log('this is end of creating new chatroom' + rid);
        return rid;
      });

  }

  getUnread(uid) {
    return this.afs.collection('messaging/' + uid + '/users', ref => ref.where('unread', '==', true)).valueChanges();
  }

  getMessages(rid) {
    return this.afs.collection('messaging/' + rid + '/messages', ref => ref.orderBy('timestamp')).valueChanges();
  }

  sendMessage(msgData) {
    console.log('send message');
    this.auth.getAuthState().subscribe(curruser => {
      const mid = this.afs.createId();
      const msg = {
        mid: mid,
        rid: msgData.rid,
        uid: curruser.uid,
        text: msgData.text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };
      this.afs.doc('messaging/' + msgData.rid + '/messages/' + mid).set(msg);

    });
  }

  getChatroom(profileuid, currentuid) {
    console.log('profile uid and current uid' + profileuid + 'helloo' + currentuid);
    return this.afs.collection('messaging/' + profileuid + '/users', ref => ref.where('uid', '==', profileuid)).valueChanges();
  }
}
