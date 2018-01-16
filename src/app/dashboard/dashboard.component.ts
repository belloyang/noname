import { Component, OnInit } from '@angular/core';
import { WampTicketService } from '../auth/services/wamp-ticket.service';
// import {WampAnonymousService} from '../auth/services/wamp-anonymous.service';
import { EventMessage } from 'thruway.js/src/Messages/EventMessage';
import { ResultMessage } from 'thruway.js/src/Messages/ResultMessage';

@Component({
  selector: 'bc-dashboard',
  templateUrl: './dashboard.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor(private wamp: WampTicketService) {}

  ngOnInit() {
    console.log('DashboardComponent onInit');
    this.wamp
      .call('com.example.add1', [1, 2])
      .map((r: ResultMessage) => {
        console.log('com.example.add1:', r);
        return r.args[0];
      })
      .subscribe(r => console.log(r));

    this.wamp
    .call('noname.backend.get_user_pwd',['sarah'])
    .map((r: ResultMessage) => {
      console.log('noname.backend.get_user_pwd:', r);
      return r.args[0];
    })
    .subscribe(r => console.log("noname.backend.get_user_pwd:",r));
  }
}
