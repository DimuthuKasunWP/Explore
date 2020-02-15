import { TestBed } from '@angular/core/testing';

import { MarkersService } from './markers.service';

describe('MarkersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkersService = TestBed.get(MarkersService);
    expect(service).toBeTruthy();
  });
});
