import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {

  @Input() modalRef;

  constructor() {
  }

  ngOnInit() {
  }

}
