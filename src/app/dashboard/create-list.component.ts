import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'bc-create-list',
  templateUrl: './create-list.html',
  styles: [],
})
export class CreateListComponent implements OnInit {
  title: string;
  category: string;
  when: Date;
  constructor(
    private backend: BackendService,
    public dialogRef: MatDialogRef<CreateListComponent>
  ) {}

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

  createChecList() {
    console.log('create a check list');

    this.backend
      .createChecList(this.title, this.category, [])
      .subscribe(r => console.log('noname.backend.create_checList:', r));
  }

  closeModal() {
    this.dialogRef.close();
  }
}
