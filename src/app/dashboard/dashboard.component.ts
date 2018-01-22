import { Component, OnInit } from '@angular/core';
import { WampTicketService } from '../auth/services/wamp-ticket.service';
// import {WampAnonymousService} from '../auth/services/wamp-anonymous.service';
import { EventMessage } from 'thruway.js/src/Messages/EventMessage';
import { ResultMessage } from 'thruway.js/src/Messages/ResultMessage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
  selector: 'bc-dashboard',
  templateUrl: './dashboard.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  checLists$: BehaviorSubject<Array<any>>;
  constructor(private wamp: WampTicketService) {
    this.checLists$ = new BehaviorSubject<Array<any>>([]);
  }

  ngOnInit() {
    console.log('DashboardComponent onInit');

    this.loadLists();

    this.wamp
      .call('noname.backend.get_user_pwd', ['sarah'])
      .map((r: ResultMessage) => {
        console.log('noname.backend.get_user_pwd:', r);
        return r.args[0];
      })
      .subscribe(r => console.log('noname.backend.get_user_pwd:', r));
  }

  loadLists() {
    console.log('loadLists..');
    this.wamp
      .call('noname.backend.get_all_lists', [])
      .map((r: ResultMessage) => {
        return r.args[0];
      })
      .subscribe(
        r => {
          console.log('noname.backend.get_all_lists:', r);
          this.checLists$.next(r);
        },
        err => {
          console.error('noname.backend.get_all_lists failed:', err);
        }
      );
  }

  createChecList() {
    console.log('create a check list');

    this.wamp
      .call('noname.backend.create_checList', ['checList-0', 'travel', []])
      .map((r: ResultMessage) => {
        console.log('noname.backend.create_checList:', r);
        return r.args[0];
      })
      .subscribe(r => console.log('noname.backend.create_checList:', r));
  }
}
