import { Injectable } from '@angular/core';
import { Client } from 'thruway.js';

@Injectable()
export class WampAnonymousService extends Client {
  constructor() {
    super('ws://localhost:9000/ws', 'noname.daemon', {
      authmethods: ['anonymous'],
    });
  }
}
