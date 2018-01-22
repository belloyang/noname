import { NgModule } from '@angular/core';
import { MatCardModule, MatGridListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
