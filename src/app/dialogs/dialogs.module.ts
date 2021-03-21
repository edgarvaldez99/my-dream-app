import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';
import { ActiveInactiveDialogComponent } from './active-inactive-dialog/active-inactive-dialog.component';
import { AdminAddUserDialogComponent } from './admin-add-user-dialog/admin-add-user-dialog.component';
import { AddEvaluationDialogComponent } from './add-evaluation-dialog/add-evaluation-dialog.component';
import { HelpBuyerDialogComponent } from './help-buyer-dialog/help-buyer-dialog.component';



@NgModule({
  declarations: [
    ForgotPasswordDialogComponent,
    LoadingDialogComponent,
    ActiveInactiveDialogComponent,
    AdminAddUserDialogComponent,
    AddEvaluationDialogComponent,
    HelpBuyerDialogComponent,
  ],
  entryComponents: [
    ForgotPasswordDialogComponent,
    LoadingDialogComponent,
    ActiveInactiveDialogComponent,
    AdminAddUserDialogComponent,
    AddEvaluationDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DialogsModule { }
