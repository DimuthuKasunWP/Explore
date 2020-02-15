import { Component, OnInit } from '@angular/core';
import {MarkersService} from '../services/markers.service';

@Component({
  selector: 'app-addmarker',
  templateUrl: './addmarker.component.html',
  styleUrls: ['./addmarker.component.css']
})
export class AddmarkerComponent implements OnInit {
  constructor(private markerservice : MarkersService) {}
  submitted;
  formcontrols=this.markerservice.form.controls;

  ngOnInit() {
  }
onSubmit(){
  this.submitted=true;
  if(this.markerservice.form.valid){
  if(this.markerservice.form.get('$key').value==null){
    this.markerservice.insertmarker(this.markerservice.form.value);
  }

    this.submitted=false;
  }
  
}
}
