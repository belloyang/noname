import { Injectable } from '@angular/core';
import { Client } from 'thruway.js';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WampTicketService extends Client {
  constructor() {
    super('ws://localhost:9000/ws', 'emc.daemon', {
      authmethods: ['ticket'],
      authid: 'joe',
    });

    this.onChallenge(challenge => {
      console.log('onChallenge called:', challenge);
      const ticketMethod = challenge.filter(msg => msg.authMethod === 'ticket');

      let ret = Observable.of('deadpool');
      console.log(ticketMethod, ret);
      return ret;
    });
  }
}
