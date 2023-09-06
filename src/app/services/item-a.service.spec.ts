import { TestBed } from '@angular/core/testing';

import { ItemAService } from './item-a.service';

describe('ItemAService', () => {
  let service: ItemAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
