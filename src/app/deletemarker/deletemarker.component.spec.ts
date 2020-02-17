import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemarkerComponent } from './deletemarker.component';

describe('DeletemarkerComponent', () => {
  let component: DeletemarkerComponent;
  let fixture: ComponentFixture<DeletemarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletemarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletemarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
