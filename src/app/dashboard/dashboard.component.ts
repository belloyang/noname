import { Component, OnInit } from '@angular/core';
import {WampTicketService} from '../auth/services/wamp-ticket.service'
import { EventMessage } from 'thruway.js/src/Messages/EventMessage';
import { ResultMessage } from 'thruway.js/src/Messages/ResultMessage';

@Component({
  selector: 'bc-dashboard',
  templateUrl: "./dashboard.html",
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor(private wamp:WampTicketService) {}

  ngOnInit() {
    console.log("DashboardComponent onInit");
    this.wamp.call("test.rpc",[])
    .map((r: ResultMessage) => r.args[0])
    .subscribe(r => console.log(r));
  }

  
}
