import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatDialogModule,
} from '@angular/material';

import { MaterialModule } from '../material';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CreateListComponent } from './create-list.component';

import { BackendService } from '../services/backend.service';
import { ListDetailComponent } from './list-detail.component';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
      { path: 'list/:id', component: ListDetailComponent },
      { path: 'about', component: AboutComponent },
    ]),
  ],
  providers: [BackendService],
  entryComponents: [CreateListComponent],
  declarations: [
    DashboardComponent,
    CreateListComponent,
    ListDetailComponent,
    AboutComponent,
  ],
})
export class DashboardModule {}
