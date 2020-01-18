import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';



@Injectable()
export class EventsService {
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private auth: AuthService
  ) {
  }

  createEvent(data){


  }
}
