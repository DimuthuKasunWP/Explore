import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmarkerComponent } from './addmarker.component';

describe('AddmarkerComponent', () => {
  let component: AddmarkerComponent;
  let fixture: ComponentFixture<AddmarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
