import {PostsService} from './posts.service';
// eslint-disable-next-line no-unused-vars
import {AngularFirestore} from 'angularfire2/firestore';
// eslint-disable-next-line no-unused-vars
import {AngularFireStorage} from 'angularfire2/storage';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {GroupService} from './group.service';
import {finalize} from 'rxjs/operators';

@Injectable()
export class UploadService {

  uploadTask;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private storage: AngularFireStorage,
    private postService: PostsService,
    private groupService: GroupService
  ) {
  }

  // Execute file upload to firebase storage
  pushUpload(file, type?: string, id?: string) {
    if (type === 'user') {

      const task = this.storage.upload('user-uploads/' + id + '/banner', file);
      const ref = this.storage.ref('user-uploads/' + id + '/banner');
      task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = ref.getDownloadURL();
          downloadURL.subscribe(
            url => {
              this.postService.updateBannerURL(url, id);
            });
        })
      ).subscribe();
    }
    if (type === 'account') {

      const task = this.storage.upload('user-uploads/' + id + '/dp', file);
      const ref = this.storage.ref('user-uploads/' + id + '/dp');
      task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = ref.getDownloadURL();
          downloadURL.subscribe(
            url => {
              const data = {
                photoURL: url
              };
              console.log('piddddd' + id);
              this.afs.doc('users/' + id).update(data);
            });
        })
      ).subscribe();
    }
    if (type === 'post') {
      console.log('post type');
      const task = this.storage.upload('post-uploads/' + id + '/post-image', file);
      const ref = this.storage.ref('post-uploads/' + id + '/post-image');
      task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = ref.getDownloadURL();
          downloadURL.subscribe(
            url => {
              this.postService.updatePhotoURL(url, id);
            });
        })
      ).subscribe();
    }
    if (type === 'banner') {

      const task = this.storage.upload('user-uploads/' + id + '/banner', file);
      const ref = this.storage.ref('user-uploads/' + id + '/banner');
      task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = ref.getDownloadURL();
          downloadURL.subscribe(
            url => {
              this.postService.updatePhotoURL(url, id);
            });
        })
      ).subscribe();
    }
    if (type === 'group') {
      const task = this.storage.upload('group-uploads/' + id + '/' + file.name, file);
      const ref = this.storage.ref('group-uploads/' + id + '/' + file.name);
      // ref.subscribe(url => {
      //   if (url) {
      //     console.log("url"+url);
      //     this.groupService.updateBannerURL(url, id);
      //   }
      // });
      task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = ref.getDownloadURL();
          downloadURL.subscribe(
            url => {
              this.groupService.updateBannerURL(url, id);
            });
        })
      ).subscribe();
    }
    if (type === 'event') {
      console.log('event type');
      const task = this.storage.upload('event-uploads/' + id + '/' + file.name, file);
      const ref = this.storage.ref('event-uploads/' + id + '/' + file.name);
      task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = ref.getDownloadURL();
          downloadURL.subscribe(
            url => {
              this.postService.updateEventPhotoURL(url, id, 'event');
            });
        })
      ).subscribe();

    }

  }
}
