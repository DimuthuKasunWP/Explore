import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {Title} from '@angular/platform-browser';
import {EventsService} from '../services/events.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  @Input()events
  @Input()modalRef;
  constructor(

    private route: ActivatedRoute,
    private groupService: EventsService,
    private userService: UserService,
    private titleService: Title
  ) { }

  ngOnInit() {
  }

}
