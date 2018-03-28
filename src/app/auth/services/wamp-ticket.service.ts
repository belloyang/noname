import { Injectable } from '@angular/core';
import { Client } from 'thruway.js';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class WampTicketService extends Client {
  constructor() {
    super(environment.wsUrl, 'noname.daemon');

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
