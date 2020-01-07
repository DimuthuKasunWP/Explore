import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';


@Component({
  selector: 'app-passwdreset',
  templateUrl: './passwdreset.component.html',
  styleUrls: ['./passwdreset.component.css']
})
export class PasswdresetComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) { }
  @ViewChild('content', { static: false }) modalContent: ElementRef;

  error: string;
  ngOnInit() {

  }


  emailform = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ])
  })



  get email() {
    return this.emailform.get("email");
  }
  open(content) {
    this.modalService.open(content);
  }

  reset(email: string) {
    console.log(email);
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }










}





