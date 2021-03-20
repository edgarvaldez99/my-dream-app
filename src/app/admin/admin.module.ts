import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { DialogsModule } from '../dialogs/dialogs.module';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DialogsModule,
    FormsModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
