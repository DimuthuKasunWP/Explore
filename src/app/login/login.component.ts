// eslint-disable-next-line no-unused-vars
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('content', {static: false}) modalContent: ElementRef;

  error: string;
  isadmin = false;
  emailform = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required
    ])
  });

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router,
    private titleService: Title,
    private modalService: NgbModal,
  ) {
  }

  get email() {
    return this.emailform.get('email');
  }

  get password() {
    return this.emailform.get('password');
  }

  ngOnInit() {
    this.auth.checkNotLogin();
    this.titleService.setTitle('Login');
  }

  login(mode) {
    if (mode === 'google') {
      this.auth.googleLogin().then(() => {
        this.router.navigateByUrl('/home');
      });
    }
    if (mode === 'email') {
      // console.log("entered");
      this.auth.getAuth().signInWithEmailAndPassword(this.email.value, this.password.value)
        .then(() => {
          this.auth.getAuthState().subscribe(user => {
            if (user) {
              if (user.emailVerified) {
                this.afs.collection('globaladminsadmins/').doc(user.uid).valueChanges().subscribe(admin => {
                  if (admin) {
                    // @ts-ignore
                    console.log('this is admin' + admin.uid);
                    this.isadmin = true;
                    console.log('this is admins' + this.isadmin);
                    if (this.isadmin) {
                      this.router.navigateByUrl('/admin');
                    } else {
                      this.router.navigateByUrl('/home');
                    }
                  }
                });

              } else {
                this.auth.getAuth().currentUser.sendEmailVerification();
                this.auth.getAuth().signOut().then(() => this.open(this.modalContent));
              }
            }
          });
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found') {
            this.error = 'No User with the given Email found.';
          }
          if (err.code === 'auth/wrong-password') {
            this.error = 'Password incorrect!';
          }
          if (err.code === 'auth/user-disabled') {
            this.error = 'User has been banned. Please contact the administrator.';
          }
        });
    }
  }

  open(content) {
    this.modalService.open(content);
  }

}
