import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerlistComponent } from './markerlist.component';

describe('MarkerlistComponent', () => {
  let component: MarkerlistComponent;
  let fixture: ComponentFixture<MarkerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
