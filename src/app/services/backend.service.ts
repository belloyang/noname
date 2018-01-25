import { Injectable } from '@angular/core';
import { WampAnonymousService } from '../auth/services/wamp-anonymous.service';
import { EventMessage } from 'thruway.js/src/Messages/EventMessage';
import { ResultMessage } from 'thruway.js/src/Messages/ResultMessage';

@Injectable()
export class BackendService {
  constructor(private wamp: WampAnonymousService) {}

  getAllLists() {
    return this.wamp
      .call('noname.backend.get_all_lists', [])
      .map((r: ResultMessage) => {
        return r.args[0];
      });
  }

  createUser(username: string, password: string) {
    return this.wamp
      .call('noname.backend.create_user', [username, password])
      .map((r: ResultMessage) => {
        return r.args[0];
      });
  }

  createChecList(name: string, category: string, items: any[]) {
    return this.wamp
      .call('noname.backend.create_checList', [name, category, items])
      .map((r: ResultMessage) => {
        return r.args[0];
      });
  }

  createEmptyChecList(title: string, category: string, when:Date, author:string) {
    return this.wamp
      .call('noname.backend.create_empty_checList', [title, category, when, author])
      .map((r: ResultMessage) => {
        return r.args[0];
      });
  }

  getListDetail(id:any){
    return this.wamp.call('noname.backend.get_list_detail',[id])
    .map((r: ResultMessage) => {
      return r.args[0];
    });
  }
}
