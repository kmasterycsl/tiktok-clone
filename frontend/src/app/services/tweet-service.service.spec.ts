import { TestBed } from '@angular/core/testing';

import { TweetServiceService } from './tweet-service.service';

describe('TweetServiceService', () => {
  let service: TweetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
