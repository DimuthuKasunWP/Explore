import { PlatformLocation } from '@angular/common';
import { GroupService } from './../services/group.service';
import { PostsService } from './../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore } from 'angularfire2/firestore';
import {NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CreateGroupComponent } from '../create-group/create-group.component';
import {FollowService} from '../services/follow.service';
import {EventsService} from '../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayName;
  userName;
  photoURL = '../../assets/images/default-profile.jpg';
  bannerURL;
  userid;
  totalFollowers;
  totalFollowing;
  totalScribes;

  modalRef;
  closeResult;
  eventModalRef;


  feedPosts;

  groups = [];
  events= [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private postsService: PostsService,
    private afs: AngularFirestore,
    private titleService: Title,
    private userService: UserService,
    private follow: FollowService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private groupService: GroupService,
    private location: PlatformLocation,
    private eventService:EventsService
  ) {
    location.onPopState((event) => {
      // ensure that modal is opened
      if (this.modalRef !== undefined) {
          this.modalRef.close();
      }
    });
  }

  getStyle() {
    if (this.bannerURL) {
      return this.sanitizer.bypassSecurityTrustStyle(`background-image: url(${this.bannerURL})`);
    }
  }

  ngOnInit() {
    this.auth.checkLogin();
    this.titleService.setTitle('Home');
    this.getCurrentUser();

  }

  sendTo(path, location?) {
    if (path === 'profile') {
      this.router.navigateByUrl('user/' + this.userName);
    }
    if (path === 'account') {
      this.router.navigateByUrl('account');
    }
    if (path === 'group' && location) {
      this.router.navigateByUrl('group/' + location);
      localStorage.setItem('gid',location);
    }
    if (path === 'custom' && location) {
      this.router.navigateByUrl(location);
    }
    if(path=='event' && location){
      this.router.navigateByUrl('event/'+location);
      localStorage.setItem("eid",location);
    }
  }
  getCurrentUser() {
    this.auth.getAuthState().subscribe(
      user => {
        if (user) {
          console.log("user id is"+user.uid);
          this.userService.retrieveUserDocument(user.uid).subscribe(
            userDoc => {
              if (userDoc) {
                console.log("entered");
                this.displayName = userDoc.displayName;
                this.userName = userDoc.userName;
                this.photoURL = userDoc.photoURL;
                this.userid = userDoc.uid;
                this.getFollowData();
                this.postsService.setUserFeedPosts(this.userid);
                this.totalScribes = userDoc.totalScribes ? userDoc.totalScribes : 0;
                this.totalFollowers = userDoc.totalFollowers ? userDoc.totalFollowers : 0;
                this.totalFollowing = userDoc.totalFollowing ? userDoc.totalFollowing : 0;
                this.bannerURL = userDoc.bannerURL ? userDoc.bannerURL : null;

                // Get pids from user feed
                this.postsService.getFeed(this.userid).subscribe(
                  feedPosts => {
                    this.feedPosts = feedPosts;

                  }
                );
                //get user's events
                this.userService.getUserEvents(this.userid).subscribe(
                  userEvents=>{

                    this.events=[];
                    userEvents.forEach((eventData:any)=>{

                        this.eventService.getEvent(eventData.eid).subscribe(
                          eventDetails=>{
                            this.events.push(eventDetails);
                          });


                    });
                  }
                );


                // Get user's groups
                this.userService.getUserGroups(this.userid).subscribe(
                  userGroups => {
                    if (userGroups) {
                      this.groups = [];
                      userGroups.forEach((groupData: any) => {
                        this.groupService.getGroup(groupData.gid).subscribe(
                          groupDetails => {
                            this.groups.push(groupDetails);
                          });
                      });
                    }
                  }
                );
              }
            });
        } else {
          this.router.navigateByUrl('start');
        }
    });
  }
  getFollowData() {
    this.follow.getFollowers(this.userid).subscribe(
      followers => {
        this.totalFollowers=Object.keys(followers).length;

      });
    this.follow.getFollowing(this.userid).subscribe(
      following => {
        this.totalFollowing=Object.keys(following).length;

      });
  }
  createGroup(content) {
    this.modalRef = this.modalService.open(content, {
      size: 'lg',
      windowClass: 'modal-style'
    });
  }

  open(content, type?) {
    this.modalRef = this.modalService.open(content, {
      size: 'sm',
      windowClass: 'modal-style'
    });
    if (type === 'grouplist') {
      // push new state to history
      history.pushState(null, null, '/user/' + this.userName + '/groups');
    }
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason, type)}`;
    });
  }

  private getDismissReason(reason: any, type?): string {
    if (type === 'grouplist') {
      history.back();
    }
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  sendToEvent(){
    this.router.navigateByUrl('event' );
  }
}
