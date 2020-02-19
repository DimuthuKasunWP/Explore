import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css']
})
export class PopupWindowComponent implements OnInit {
  @Input() modalRef;

  constructor() {
  }

  ngOnInit() {
  }

}
