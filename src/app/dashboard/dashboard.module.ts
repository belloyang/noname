import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatDialogModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CreateListComponent } from './create-list.component';

import { BackendService } from '../services/backend.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
  providers: [BackendService],
  entryComponents: [CreateListComponent],
  declarations: [DashboardComponent, CreateListComponent],
})
export class DashboardModule {}
