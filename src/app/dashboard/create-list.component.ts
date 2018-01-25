import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as fromAuth from '../auth/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'bc-create-list',
  templateUrl: './create-list.html',
  styles: [],
})
export class CreateListComponent implements OnInit {
  title: string;
  category: string;
  when: Date;
  author:string;
  constructor(
    private backend: BackendService,
    public dialogRef: MatDialogRef<CreateListComponent>,
    private store: Store<fromAuth.State>
  ) {}

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

  createEmptyChecList() {
    console.log('create an empty check list');
    this.getLoginUser().subscribe(
      username=>{
        this.backend
        .createEmptyChecList(this.title, this.category, new Date(), username)
        .subscribe(r => console.log('noname.backend.create_empty_checList:', r));
      }
    )
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

  getLoginUser(){
    return this.store
    .select(fromAuth.getUser)
    .take(1)
    .map(user=>{
      console.log("getLoginUser",user);
      return user.name;
    });
  }
}
