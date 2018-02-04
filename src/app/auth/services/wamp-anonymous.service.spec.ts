import { TestBed, inject } from '@angular/core/testing';

import { WampAnonymousService } from './wamp-anonymous.service';

describe('WampAnonymousService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WampAnonymousService],
    });
  });

  it(
    'should be created',
    inject([WampAnonymousService], (service: WampAnonymousService) => {
      expect(service).toBeTruthy();
    })
  );
});
