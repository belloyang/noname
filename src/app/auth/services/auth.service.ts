import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User, Authenticate } from '../models/user';
import { UserLoginInfo } from './user-login-info';

@Injectable()
export class AuthService {
  constructor() {}

  login({ username, password }: Authenticate) {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    for (let info of UserLoginInfo) {
      if (info.username == username) {
        if (info.password == password) {
          console.log('authentication succeeded!');
          return of({ name: 'User' });
        } else {
          return _throw('Invalid password');
        }
      }
    }
    return _throw('Invalid username');
  }

  logout() {
    return of(true);
  }
}
