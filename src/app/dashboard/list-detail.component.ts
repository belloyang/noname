import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BackendService } from '../services/backend.service';
@Component({
  selector: 'bc-list-detail',
  templateUrl: './list-detail.html',
  styles: []
})
export class ListDetailComponent implements OnInit {

  listId:any;
  listDetail$:BehaviorSubject<any>;
  constructor(private router:Router, 
    private route:ActivatedRoute,
    private backend:BackendService
  ) { 
    this.listDetail$ = new BehaviorSubject({});

    route.params.map(params => params.id).subscribe(value => {
      this.listId = value;
      console.log('listId:', this.listId);

      this.backend.getListDetail(this.listId).subscribe(
        detail=>{
          console.log("getListDetail:"+this.listId,detail);
          this.listDetail$.next(detail);
        },
        err=>{
          console.error("Failed to getListDetail:"+this.listId,err);
        }
      );

    });
  }

  ngOnInit() {
    
  }

}
