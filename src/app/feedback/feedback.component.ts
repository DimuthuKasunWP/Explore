import {Title} from '@angular/platform-browser';
// eslint-disable-next-line no-unused-vars
import {Router} from '@angular/router';
// eslint-disable-next-line no-unused-vars
import {Component, OnInit} from '@angular/core';
// eslint-disable-next-line no-unused-vars
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  text;
  subject;
  showSuccess;
  requiredErr;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Feeback');
  }

  submit() {
    if (this.text && this.subject) {
      this.requiredErr = false;
      const fid = this.afs.createId();
      const feedback = {
        fid: fid,
        subject: this.subject,
        feedback: this.text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };
      this.afs.doc('feedback/' + fid).set(feedback).then(() => {
        this.showSuccess = 'Feedback successfully submitted';
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 2000);
      });
    } else {
      this.requiredErr = true;
    }
  }

}
