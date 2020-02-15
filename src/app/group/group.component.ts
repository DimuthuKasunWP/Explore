import { DomSanitizer, Title } from '@angular/platform-browser';
import { UploadService } from './../services/upload.service';
import { CreateGroupComponent } from './../create-group/create-group.component';
import { AuthService } from './../services/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/group.service';
import { DateFormatPipe } from '../services/date.pipe';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @ViewChild('addmembers', { static: false}) modalContent: ElementRef;


@Input() administrator;
  gid;
  gname;
  desc;
  totalMembers;
  totalPosts;
  createDate;
  members;
  admin;
  bannerURL;

  isInvalid;
  isSubbed = false;
  isLoggedin;
  isLoaded = false;
  isAdmin = false;

  posts;
  modalRef;
  closeResult;

  filename;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private datePipe: DateFormatPipe,
    private modalService: NgbModal,
    private location: PlatformLocation,
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {
    location.onPopState((event) => {
      // ensure that modal is opened
      if (this.modalRef !== undefined) {
          this.modalRef.close();
      }
    });
  }

  ngOnInit() {
    console.log(localStorage.getItem("gid"));
    this.route.params.subscribe(
      routeurl => {
        this.gid = routeurl.gid;
        this.groupService.getGroup(this.gid).subscribe(
          groupDoc => {
            if (groupDoc) {
              this.gname = groupDoc.gname;
              this.desc = groupDoc.desc;
              this.createDate = groupDoc.createDate;
              this.admin = groupDoc.admin ? groupDoc.admin : null;
              this.isLoaded = true;
              this.bannerURL = groupDoc.bannerURL ? groupDoc.bannerURL : null;
              this.titleService.setTitle(this.gname + ' | ' + this.desc);
              this.checkAdmin();
              this.checkGlobalAdministrator();
            } else {
              console.log('invalid');
              this.isInvalid = true;
              this.isLoaded = true;
            }
          });
      this.groupService.getFeed(this.gid).subscribe(
        feed => {
          this.posts = feed;
        });
      this.groupService.getMembers(this.gid).subscribe(
        memberList => {
          this.members = memberList;
        });
        this.checkSub();
        this.checkLogin();
    });
  }

  getStyle() {
    if (this.bannerURL) {
      return this.sanitizer.bypassSecurityTrustStyle(`background-image: url(${this.bannerURL})`);
    }
  }

  checkLogin() {
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    });
  }

  checkAdmin() {
    this.auth.getAuthState().subscribe(curruser => {
      if (curruser) {
        if (this.admin === curruser.uid) {
          this.isAdmin = true;
          this.administrator=true;
        } else {
          this.isAdmin = false;
        }
      }
    });
  }
  checkGlobalAdministrator(){
    console.log("this is global administrator");

    this.auth.getAuthState().subscribe(curruser => {
      if (curruser) {
        console.log("this is current user"+curruser.uid);
        this.auth.getAllGlobalAdministrators().subscribe(admin=>{
          var count =0;
          while(count<Object.keys(admin).length){
            // @ts-ignore
            if(admin[count++].uid === curruser.uid){
              this.administrator=true;
              // this.isAdmin=true;
            }
          }


        });
      }
    });
  }

  checkSub() {
    this.auth.getAuthState().subscribe(currentuser => {
      if (currentuser) {
        this.afs.doc('groups/' + this.gid + '/members/' + currentuser.uid)
          .valueChanges()
        .subscribe(user => {
          if (user) {
            this.isSubbed = true;
          } else {
            this.isSubbed = false;
          }
        });
      }
    });
  }

  subscribe() {
    this.groupService.subscribe(this.gid);
  }

  unsubscribe() {
    this.groupService.unsubscribe(this.gid);
    this.checkSub();
  }

  getDate() {
    return this.datePipe.transform(this.createDate.toDate(), 'month');
  }
  sendTo(type){
    if(type === 'edit'){
      this.router.navigateByUrl('event');
      localStorage.setItem("gid",this.gid);
    }
    if(type ==='delete'){

      this.groupService.deleteGroup(this.gid);
      if(this.administrator && this.admin)
      this.router.navigateByUrl('home');
      else if(this.admin)
        this.router.navigateByUrl('home');
      else if(this.administrator)
        this.router.navigateByUrl('admin');
      alert("group successfully deleted");
    }

  }

  open(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  see(){
    this.modalRef = this.modalService.open(this.modalContent, {
      size: 'lg',
      windowClass: 'modal-style'
    });
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  processImage(event) {
    const file = event.target.files[0];
    if (file.size > 2000000) {
      this.filename = 'Max Filesize 2Mb!';
    } else {
      this.filename = 'Edit Banner';
      this.uploadService.pushUpload(file, 'group', this.gid);
    }
  }

addMembers(){
  this.see();
}

}
