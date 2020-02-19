import {Component, OnInit} from '@angular/core';
import {HashtagService} from '../services/hashtag.service';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {PostsService} from '../services/posts.service';

@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.css']
})
export class HashtagComponent implements OnInit {
  photos = [];
  hid;
  count = 0;
  posts = [];

  constructor(
    private hashservice: HashtagService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private posservice: PostsService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      routeurl => {
        // console.log("hiddd"+localStorage.getItem('hid'));
        this.hid = localStorage.getItem('hid');
        this.getpostByHashtag(this.hid).subscribe(posts => {
          // @ts-ignore
          console.log('hashtag posts id' + posts[0].pid);
          while (this.count < Object.keys(posts).length) {
            // @ts-ignore
            this.posts.push(posts[this.count++].pid);
          }
          this.count = 0;
          while (this.count < this.posts.length) {
            var post = this.posservice.getPost(this.posts[this.count]).subscribe(post => {
              // console.log("photo url"+post.photoURL);
              this.photos.push(post.photoURL);

            });
            this.count++;
          }

        });
      });

  }

  getpostByHashtag(hid) {
    console.log('hidd' + hid);
    return this.afs.collection('/hashtags/' + hid + '/posts').valueChanges();


  }

}
