import { Injectable } from '@angular/core';
import {FormControl,FormGroup, FormControlName,Validators}from '@angular/forms'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {
  form: any;

  constructor() { 
      this.form = new FormGroup({
      $key :new FormControl(null),
      markerName: new FormControl('',Validators.required),
      eventID: new FormControl(''),
      location:new FormControl('',Validators.required),
      description:new FormControl(''),
});

  }
}
