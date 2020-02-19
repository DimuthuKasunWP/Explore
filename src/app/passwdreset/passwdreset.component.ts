import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';


@Component({
  selector: 'app-passwdreset',
  templateUrl: './passwdreset.component.html',
  styleUrls: ['./passwdreset.component.css']
})
export class PasswdresetComponent implements OnInit {
  @ViewChild('content', {static: false}) modalContent: ElementRef;
  error: string;
  emailform = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ])
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  get email() {
    return this.emailform.get('email');
  }

  ngOnInit() {

  }

  open(content) {
    this.modalService.open(content);
  }

  reset(email: string) {
    console.log(email);
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => this.open('Please check your email '));

  }


}





