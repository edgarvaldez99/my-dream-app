import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePipe } from './role.pipe';



@NgModule({
  declarations: [RolePipe],
  exports: [RolePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
