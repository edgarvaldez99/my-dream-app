import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpErrorSnackBarComponent } from './http-error-snack-bar/http-error-snack-bar.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { DialogsModule } from '../dialogs/dialogs.module';



@NgModule({
  declarations: [
    HttpErrorSnackBarComponent,
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    DialogsModule,
  ],
})
export class SharedModule { }
