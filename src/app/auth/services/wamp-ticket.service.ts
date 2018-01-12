import { Injectable } from '@angular/core';
import { Client } from 'thruway.js';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WampTicketService extends Client {
  constructor() {
    super('ws://localhost:9200/ws', 'noname.daemon');

    this.onChallenge(challenge => {
      console.log('onChallenge called:', challenge);

      return Observable.of('deadpool');
    });
    this.onOpen.subscribe(data =>
      console.log('WampTicketService onOpen', data)
    );

    this.onClose.subscribe(data =>
      console.log('WampTicketService onClose', data)
    );
  }
}
