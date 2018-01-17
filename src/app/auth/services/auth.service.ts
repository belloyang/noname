import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User, Authenticate } from '../models/user';

import { WampTicketService } from './wamp-ticket.service';
import { EventMessage } from 'thruway.js/src/Messages/EventMessage';
import { ResultMessage } from 'thruway.js/src/Messages/ResultMessage';
@Injectable()
export class AuthService {
  constructor(private wamp: WampTicketService) {}

  login({ username, password }: Authenticate) {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    // for (let info of UserLoginInfo) {
    //   if (info.username == username) {
    //     if (info.password == password) {
    //       console.log('authentication succeeded!');
    //       return of({ name: 'User' });
    //     } else {
    //       return _throw('Invalid password');
    //     }
    //   }
    // }
    let authInfo = { username, password };
    console.log('login:', authInfo);
    return this.wamp
      .call('noname.backend.authenticate', [username, password])
      .map(
        (ret: ResultMessage) => {
          console.log('noname.backend.authenticate returns:', ret.args[0]);
          
          return { name: 'User' };
          
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
