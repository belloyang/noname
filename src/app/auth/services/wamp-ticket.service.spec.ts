import { TestBed, inject } from '@angular/core/testing';

import { WampTicketService } from './wamp-ticket.service';

describe('WampTicketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WampTicketService],
    });
  });

  it('should be created', inject(
    [WampTicketService],
    (service: WampTicketService) => {
      expect(service).toBeTruthy();
    }
  ));
});
