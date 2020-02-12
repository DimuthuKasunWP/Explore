import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.css']
})
export class SuggestedComponent implements OnInit {

  users=[];
  currentuser;
  count=0;

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
          userlist.push(doc.id);
        });
        this.userService.getFollowingUsers(this.currentuser).subscribe(followinguser=>{

          while (this.count<Object.keys(followinguser).length) {
            var user=followinguser[this.count++];
            // @ts-ignore
            following.push(user.uid);
          }
        });
      });
      setTimeout(()=>{
        if(userlist.length>0 && following.length>0) {
          for (var user in userlist) {
            for (var follow in following) {
              console.log("user"+user+"follow"+follow);
              if (user === (follow)) {
                console.log("user in the following list");
              } else {
                this.users.push(user);
              }
            }
          }
        }else{
          this.users=userlist;
        }
        console.log("count"+this.users.length);


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

}
