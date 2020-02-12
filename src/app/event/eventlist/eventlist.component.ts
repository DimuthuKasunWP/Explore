import {Component, Input, OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Title} from '@angular/platform-browser';
import {EventsService} from '../../services/events.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  @Input()events;
  @Input()modalRef;

  username;
  constructor(

    private route: ActivatedRoute,
    private eventService: EventsService,
    private userService: UserService,
    private titleService: Title
  ) { }

  ngOnInit() {

    if (!this.events) {
      this.route.params.subscribe(router => {
        this.username = router.username;
        this.titleService.setTitle(this.username + '\'s Events')
        this.userService.retrieveUserDocumentFromUsername(this.username).subscribe(currentuser => {
          const curruser: any = currentuser[0];
          this.userService.getUserEvents(curruser.uid).subscribe(userEvents => {
            if (userEvents) {
              this.events = [];
              userEvents.forEach((groupData: any) => {
                this.eventService.getEvent(groupData.gid).subscribe(
                  eventDetails => {
                    this.events.push(eventDetails);
                  });
              });
            }
          });
        });
      });
    }

  }

  close() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

}
