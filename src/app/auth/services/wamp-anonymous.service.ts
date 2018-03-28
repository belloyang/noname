import { Injectable } from '@angular/core';
import { Client } from 'thruway.js';
import { environment } from '../../../environments/environment';
@Injectable()
export class WampAnonymousService extends Client {
  constructor() {
    super(environment.wsUrl, 'noname.daemon', {
      authmethods: ['anonymous'],
    });
  }
}
