import { TestBed } from '@angular/core/testing';

import { DispatchNotesService } from './dispatch-notes.service';

describe('DispatchNotesService', () => {
  let service: DispatchNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispatchNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
