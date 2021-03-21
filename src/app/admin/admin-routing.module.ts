import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './currency/currency.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'user/list', component: UserComponent },
  { path: 'currency/list', component: CurrencyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
