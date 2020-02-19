import {AuthService} from './auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {GroupService} from './group.service';
import {EventsService} from './events.service';
import * as firebase from 'firebase';

@Injectable()
export class NotificationService {
  posteduid;
  count = 0;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private userService: UserService,
    private grservice: GroupService,
    private evservice: EventsService
  ) {
  }

  getNotifs(uid) {
    return this.afs.collection('users/' + uid + '/notifications', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  getNotifGroup(uid) {
    return this.afs.collection('users/' + uid + '/notificationgroup', ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  getNotifComment(uid) {
    return this.afs.collection('users/' + uid + '/notificationcomment', ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  getNotifLike(uid) {
    return this.afs.collection('users/' + uid + '/notificationlike', ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  getNotifEvent(uid) {
    return this.afs.collection('users/' + uid + '/notificationevent', ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  getUserUnread(uid) {
    return this.afs.collection('users/' + uid + '/unread', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  clearUnread(uid) {
    this.afs.collection('users/' + uid + '/unread').valueChanges().subscribe(unread => {
      unread.forEach(notif => {
        const notification: any = notif;
        this.afs.doc('users/' + uid + '/unread/' + notification.pid).delete();
      });
    });
  }

  notifyifreplytopost(pid, commentuid) {
    this.getPost(pid).subscribe(post => {
      console.log('this is pid' + post.uid);
      if (post) {
        console.log('post exists');
        var uid = post.uid;
        let data = {
          uid: commentuid,
          type: 'comment',
          date: firebase.firestore.FieldValue.serverTimestamp(),
          pid: pid
        };
        this.afs.collection('users/' + uid + '/notificationcomment/').doc(pid).set(data);
      }

    });


  }

  notifyifliketopost(pid, likeduid) {
    this.getPost(pid).subscribe(post => {
      if (post) {
        console.log('post exists');
        var uid = post.uid;
        let data = {
          uid: likeduid,
          type: 'like',
          date: firebase.firestore.FieldValue.serverTimestamp(),
          pid: pid
        };
        this.afs.collection('users/' + uid + '/notificationlike/').doc(pid).set(data);
      }

    });

  }

  getpostedUid(pid, gid, type): any {
    this.getPost(pid).subscribe(post => {
      if (post) {
        console.log('this is uid' + post.uid);
        this.posteduid = post.uid;
        if (type === 'group') {
          var notifyuserslist = [];
          this.grservice.getMembers(gid).subscribe(users => {

            while (this.count < Object.keys(users).length) {
              // @ts-ignore
              console.log('users ' + users[this.count].uid);
              // @ts-ignore
              notifyuserslist.push(users[this.count].uid);
              this.count++;
            }
            let data = {
              uid: this.posteduid,
              type: 'group',
              date: firebase.firestore.FieldValue.serverTimestamp(),
              pid: pid
            };
            this.count = 0;
            while (this.count < notifyuserslist.length) {
              console.log('argument' + this.posteduid);
              this.afs.collection('users/' + notifyuserslist[this.count++] + '/notificationgroup/').doc(pid).set(data);
            }
          });
        } else {
          var notifyuserslist = [];
          this.evservice.getmembers(gid).subscribe(users => {

            while (this.count < Object.keys(users).length) {
              // @ts-ignore
              console.log('users ' + users[this.count].uid);
              // @ts-ignore
              notifyuserslist.push(users[this.count].uid);
              this.count++;
            }
            let data = {
              uid: this.posteduid,
              type: 'event',
              date: firebase.firestore.FieldValue.serverTimestamp(),
              pid: pid
            };
            this.count = 0;
            while (this.count < notifyuserslist.length) {
              console.log('argument' + this.posteduid);
              this.afs.collection('users/' + notifyuserslist[this.count++] + '/notificationevent/').doc(pid).set(data);
            }
          });
        }
      }

    });
  }


  notifyifpostedingroup(gid, pid, type) {
    this.getpostedUid(pid, gid, type);

  }

  notifyifpostedinevent(eid, pid, type) {
    this.getpostedUid(pid, eid, type);

  }

  getPost(pid) {
    return this.afs.doc<any>('posts/' + pid).valueChanges();
  }
}
