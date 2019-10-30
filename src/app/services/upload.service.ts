import { PostsService } from './posts.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { GroupService } from './group.service';

@Injectable()
export class UploadService {

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private storage: AngularFireStorage,
    private postService: PostsService,
    private groupService: GroupService
  ) { }

  uploadTask;

  // Execute file upload to firebase storage
  pushUpload(file, type?: string, id?: string) {
    if (type === 'user') {
      const downloadURL = this.storage.upload('user-uploads/' + id + '/dp', file);
      const ref = this.storage.ref('user-uploads/' + id + '/dp').getDownloadURL();
      ref.subscribe(url => {
        if (url) {
          this.auth.updatePhotoURL(url);
        }
      });
    }
    if (type === 'post') {
      const downloadURL = this.storage.upload('post-uploads/' + id + '/post-image', file);
      const ref = this.storage.ref('post-uploads/' + id + '/post-image').getDownloadURL();
      ref.subscribe(url => {
        if (url) {
          this.postService.updatePhotoURL(url, id);
        }
      });
    }
    if (type === 'banner') {
      const downloadURL = this.storage.upload('user-uploads/' + id + '/banner', file);
      const ref = this.storage.ref('user-uploads/' + id + '/banner').getDownloadURL();
      ref.subscribe(url => {
        if (url) {
          this.postService.updateBannerURL(url, id);
        }
      });
    }
    if (type === 'group') {
      const downloadURL = this.storage.upload('group-uploads/' + id + '/banner', file);
      const ref = this.storage.ref('group-uploads/' + id + '/banner').getDownloadURL();
      ref.subscribe(url => {
        if (url) {
          this.groupService.updateBannerURL(url, id);
        }
      });
    }
  }
}
