import { Component, OnInit } from '@angular/core';
import { WampTicketService } from '../auth/services/wamp-ticket.service';
// import {WampAnonymousService} from '../auth/services/wamp-anonymous.service';
import { EventMessage } from 'thruway.js/src/Messages/EventMessage';
import { ResultMessage } from 'thruway.js/src/Messages/ResultMessage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BackendService } from '../services/backend.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateListComponent } from './create-list.component';
import { Router } from '@angular/router';
@Component({
  selector: 'bc-dashboard',
  templateUrl: './dashboard.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  checLists$: BehaviorSubject<Array<any>>;
  constructor(
    private wamp: WampTicketService,
    private backend: BackendService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.checLists$ = new BehaviorSubject<Array<any>>([]);
  }

  ngOnInit() {
    console.log('DashboardComponent onInit');

    this.loadLists();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(CreateListComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.loadLists();
    });
  }

  loadLists() {
    console.log('loadLists..');
    this.backend.getAllLists().subscribe(
      r => {
        console.log('noname.backend.get_all_lists:', r);
        this.checLists$.next(r);
      },
      err => {
        console.error('noname.backend.get_all_lists failed:', err);
      }
    );
  }

  gotoListDetail(listId: any) {
    console.log('gotoListDetail:', listId);
    this.router.navigate(['/dashboard/list', listId]);
  }
}
