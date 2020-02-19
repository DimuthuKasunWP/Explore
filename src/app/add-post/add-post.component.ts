// eslint-disable-next-line no-unused-vars
import {UploadService} from './../services/upload.service';
// eslint-disable-next-line no-unused-vars
import {AngularFirestore} from 'angularfire2/firestore';
// eslint-disable-next-line no-unused-vars
import {PostsService} from './../services/posts.service';
// eslint-disable-next-line no-unused-vars
import {Component, Input, OnInit} from '@angular/core';
// eslint-disable-next-line no-unused-vars
import {DomSanitizer} from '@angular/platform-browser';
// eslint-disable-next-line no-unused-vars
import {Router} from '@angular/router';
// eslint-disable-next-line no-unused-vars
import {HashtagService} from '../services/hashtag.service';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @Input() userURL: string;
  @Input() showAvatar;
  @Input() type;
  @Input() id;

  buttonsClass = 'col-12 mt-2 d-none';
  textareaClass = 'form-control col-10';
  imgcontainerClass = 'col-2';
  addPostWrapper;
  containerStyle;
  route;
  hashtags = [];

  // Post Data
  postBody;
  imgURL;
  pid;

  // Image Data
  inputFile;
  filename;

  // eslint-disable-next-line no-useless-constructor
  constructor(
    private postService: PostsService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private afs: AngularFirestore,
    private uploadService: UploadService,
    private hashtagService: HashtagService,
    private notifyservice: NotificationService
  ) {
  }

  ngOnInit() {
    this.pid = this.afs.createId();
    this.route = this.router.url.slice(1, 5);
    if (this.route === 'user') {
      this.textareaClass = 'form-control col-12 mx-1 my-2';
      this.imgcontainerClass = 'd-none';
      this.addPostWrapper = 'row mx-1 justify-content-center';
      this.containerStyle = 'rounded p-2 my-1 container-fluid';
    } else {
      this.imgcontainerClass = 'col-2 mx-0';
      this.textareaClass = 'form-control col-10';
      this.addPostWrapper = 'row mr-1 justify-content-center';
      this.containerStyle = 'rounded p-2 mb-1 container-fluid';
    }
    if (!this.userURL) {
      this.userURL = '../../assets/images/default-profile.jpg';
    }
  }

  expand() {
    this.buttonsClass = 'col-12 mt-2';
    if (this.route === 'user') {
      this.textareaClass = 'form-control col-12 expanded mx-1 my-2';
    } else {
      this.textareaClass = 'form-control col-10 expanded';
    }
  }

  contract() {
    this.buttonsClass = 'col-9 col-lg-12 mt-2 d-none';
    if (this.route === 'user') {
      this.textareaClass = 'form-control col-12 mx-1 my-2';
    } else {
      this.textareaClass = 'form-control col-10';
    }
  }

  addPost() {
    let hashTagReg: RegExp = /#[A-Za-z0-9]*/g;
    this.hashtags = this.postBody.match(hashTagReg);
    var count = 0;
    if (this.hashtags) {
      while (count < this.hashtags.length) {
        console.log('name' + this.hashtags[count]);
        let data = {
          hid: this.afs.createId(),
          name: this.hashtags[count++]
        };
        this.hashtagService.sethashtag(data);
        this.hashtagService.setposttoHashtag(this.pid);
      }
      this.postBody = this.postBody.replace(hashTagReg, '');
    }
    this.hashtags = null;
    this.contract();
    if (!this.type) {
      if (this.postBody) {
        const newPost = {
          body: this.postBody,
          imgURL: this.imgURL ? this.imgURL : null,
          pid: this.pid
        };
        this.postService.addPost(newPost);
        if (this.inputFile) {
          this.uploadService.pushUpload(this.inputFile, 'post', this.pid);
        }
        this.postBody = null;
        // this.router.navigateByUrl("home");
      }
    }
    if (this.type === 'group') {
      if (this.postBody) {
        this.pid = this.afs.createId();
        const newPost = {
          body: this.postBody,
          imgURL: this.imgURL ? this.imgURL : null,
          to: this.id,
          type: 'group',
          pid: this.pid
        };
        if (this.inputFile) {
          this.uploadService.pushUpload(this.inputFile, 'group', this.pid);
        }
        this.postService.addPost(newPost);
        this.notifyservice.notifyifpostedingroup(this.id, this.pid, 'group');
        this.postBody = null;
      }
    }
    if (this.type === 'event') {
      if (this.postBody) {
        this.pid = this.afs.createId();
        const newPost = {
          body: this.postBody,
          imgURL: this.imgURL ? this.imgURL : null,
          to: this.id,
          type: 'event',
          pid: this.pid
        };
        if (this.inputFile) {
          this.uploadService.pushUpload(this.inputFile, 'event', this.pid);
        }
        this.postService.addPost(newPost);
        this.notifyservice.notifyifpostedingroup(this.id, this.pid, 'event');
        this.postBody = null;
      }
    }

  }

  processImage(event) {
    console.log('this is process image');
    this.inputFile = event.target.files[0];
    this.filename = this.inputFile.name;
    if (this.inputFile.size > 2000000) {
      this.filename = 'Max Filesize 2Mb!';
    } else {
      if (this.filename.length > 25) {
        this.filename = this.filename.slice(0, 10) + '...' + this.filename.slice(this.filename.length - 3);
      }
      console.log('pid is the ' + this.pid);
      this.uploadService.pushUpload(this.inputFile, 'post', this.pid);
    }
  }
}
