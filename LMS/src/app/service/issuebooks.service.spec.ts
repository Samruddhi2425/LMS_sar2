import { TestBed } from '@angular/core/testing';

import { IssuebooksService } from './issuebooks.service';

describe('IssuebooksService', () => {
  let service: IssuebooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuebooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
