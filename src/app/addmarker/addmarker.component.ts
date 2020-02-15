import { Component, OnInit } from '@angular/core';
import {MarkersService} from '../services/markers.service'

@Component({
  selector: 'app-addmarker',
  templateUrl: './addmarker.component.html',
  styleUrls: ['./addmarker.component.css']
})
export class AddmarkerComponent implements OnInit {
  constructor(private markerservice = new MarkersService) {}
  submitted=Boolean;
  formcontrols=this.markerservice.form.controls;

  ngOnInit() {
  }
onSubmit(){
  this.submitted=true;
  if(this.markerservice.form.valid){


    this.submitted=false;
  }
  
}
}
