import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
  suggestedUserList = [];
  count = 0;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router
  ) {
  }

  retrieveUserDocument(uid) {
    return this.afs.doc<any>('users/' + uid).valueChanges();
  }

  retrieveUserDocumentFromUsername(username) {
    return this.afs.collection('users', ref => ref.where('userName', '==', username)).valueChanges();
  }

  retrieveUserDocumentFromID(uid) {
    return this.afs.doc<any>('users/' + uid).valueChanges();
  }

  getUserGroups(uid) {
    return this.afs.collection('users/' + uid + '/groups', ref => ref.orderBy('last', 'desc')).valueChanges();
  }

  getUserEvents(uid) {
    return this.afs.collection('users/' + uid + '/events', ref => ref.orderBy('last', 'desc')).valueChanges();
  }

  getMostFollowedUsers() {
    return this.afs.collection('users', ref => ref.orderBy('totalFollowers', 'desc').limit(5)).valueChanges();

  }

  getFollowingUsers(uid) {
    console.log('user ' + uid);
    return this.afs.collection('users/' + uid + '/following').valueChanges();
  }

  getUsersList() {
    return this.afs.collection('users').get();
  }

  deleteUserProfile(uid) {
    this.afs.doc('users/' + uid).delete();
  }
}
