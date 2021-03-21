import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectNewComponent } from './project-new/project-new.component';

const routes: Routes = [
  {
    path: 'list',
    component: ProjectListComponent,
  },
  {
    path: ':id/detail',
    component: ProjectDetailComponent,
  },
  {
    path: 'new',
    component: ProjectNewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
