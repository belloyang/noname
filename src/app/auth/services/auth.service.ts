import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User, Authenticate } from '../models/user';

import { WampTicketService } from './wamp-ticket.service';
import { EventMessage } from 'thruway.js/src/Messages/EventMessage';
import { ResultMessage } from 'thruway.js/src/Messages/ResultMessage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  constructor(private wamp: WampTicketService) {}

  loginAnonymously({}) {
    return Observable.of({ name: 'Anonymous' });
  }

  login({ username, password }: Authenticate): Observable<User> {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    let authInfo = { username, password };
    console.log('login:', authInfo);
    return this.wamp
      .call('noname.backend.authenticate', [username, password])
      .map(
        (ret: ResultMessage) => {
          console.log('noname.backend.authenticate returns:', ret.args[0]);

          return { name: username };
        },
        (err: any) => {
          console.log('noname.backend.authenticate failed', err);
          _throw(err);
        }
      );
  }

  logout() {
    return of(true);
  }
}
