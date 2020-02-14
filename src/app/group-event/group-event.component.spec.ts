import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEventComponent } from './group-event.component';

describe('GroupEventComponent', () => {
  let component: GroupEventComponent;
  let fixture: ComponentFixture<GroupEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
