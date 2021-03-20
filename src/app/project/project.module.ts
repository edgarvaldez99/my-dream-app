import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { MaterialModule } from '../material/material.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { DialogsModule } from '../dialogs/dialogs.module';


@NgModule({
  declarations: [ProjectListComponent, ProjectDetailComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MaterialModule,
    DialogsModule,
  ]
})
export class ProjectModule { }
