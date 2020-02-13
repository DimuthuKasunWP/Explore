import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.css']
})
export class SuggestedComponent implements OnInit {

  userDetails=[];
  users=[];
  currentuser;
  count=0;
  photoURL = '../../assets/images/default-profile.jpg';

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        this.currentuser = user.uid;
      } else {
        this.currentuser = null;
      }
      // this.users=this.userService.getSuggestedUsers(this.currentuser);
      var following=[];
      var userlist=[];
      this.userService.getUsersList().subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("users"+doc.id);
          userlist.push(doc.id);
        });
        this.userService.getFollowingUsers(this.currentuser).subscribe(followinguser=>{

          while (this.count<Object.keys(followinguser).length) {
            // @ts-ignore
            console.log("following"+followinguser[this.count++].uid)
            var user=followinguser[this.count++];
            // @ts-ignore
            following.push(user.uid);
          }
        });
      });
      setTimeout(()=>{
        if(userlist.length>0 && following.length>0) {
          console.log("accessing data"+userlist[0]);
          var usercount=0;
          var followcount=0;
          while (usercount< userlist.length) {
            console.log("usercount"+usercount);
            while (followcount< following.length) {
              console.log("followcount"+followcount);
              console.log("user"+userlist[usercount]+"follow"+following[followcount]);
              if (userlist[usercount] === (following[followcount++])) {
                console.log("user in the following list");
              } else {
                console.log("pushing data"+userlist[usercount]);
                this.userDetails.push(userlist[usercount]);
              }
            }
            followcount=0;
            usercount++;
          }
        }else{
          this.userDetails=userlist;
        }
        console.log("count"+this.userDetails.length);
        this.addUserDetails();

      },2000);
    });


  }

  checkCurrent(uid) {
    if (this.currentuser && this.currentuser === uid) {
      return false;
    } else {
      return true;
    }
  }

  addUserDetails(){
    this.count=0;
    while (this.count<this.userDetails.length){
      this.userService.retrieveUserDocument(this.userDetails[this.count++]).subscribe(userdoc=>{
        if(userdoc){
          var userName=userdoc.userName;
          var uid=userdoc.uid;
          var photoURL=userdoc.photoURL;
          console.log("username"+userName+"uid"+uid);
          var data={
            uid:uid,
            userName:userName,
            photoURL:photoURL?photoURL:this.photoURL
          }
          this.users.push(data);
        }
      });
    }
  }

}
