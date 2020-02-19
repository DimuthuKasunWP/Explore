import {Router} from '@angular/router';
import {MessageService} from './../../services/message.service';
import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  @Input() room;
  @Input() modalRef;

  msgText;

  msgs;

  constructor(
    private msgService: MessageService,
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (!this.room.displayName) {
      this.auth.getAuthState().subscribe(curruser => {
        if (curruser) {
          console.log('this is room id' + this.room.uid);
          this.userService.retrieveUserDocumentFromID(this.room.uid).subscribe(user => {
            console.log('entered to the  ngoninit' + this.room.uid);
            if (user) {
              this.room = {
                displayName: user.displayName,
                userName: user.userName,
                rid: this.room.rid,
                photoURL: user.photoURL
              };
            }
          });
        } else {
          this.router.navigateByUrl('home');
        }
      });
    }
    this.msgService.getMessages(this.room.rid).subscribe(msgs => {
      if (msgs.length > 0) {
        this.msgs = msgs;
      }
    });
  }

  sendMsg() {
    if (this.msgText) {
      const data = {
        text: this.msgText,
        rid: this.room.rid
      };
      this.msgText = '';
      this.msgService.sendMessage(data);
    }
  }

  sendToProfile() {
    if (this.modalRef) {
      this.modalRef.close();
      this.router.navigateByUrl('user/' + this.room.userName);
    }
  }
}
