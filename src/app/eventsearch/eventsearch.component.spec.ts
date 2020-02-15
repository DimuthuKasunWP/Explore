import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsearchComponent } from './eventsearch.component';

describe('EventsearchComponent', () => {
  let component: EventsearchComponent;
  let fixture: ComponentFixture<EventsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
