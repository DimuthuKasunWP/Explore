import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswdresetComponent } from './passwdreset.component';

describe('PasswdresetComponent', () => {
  let component: PasswdresetComponent;
  let fixture: ComponentFixture<PasswdresetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswdresetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswdresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
