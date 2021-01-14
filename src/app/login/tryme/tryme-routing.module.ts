import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrymePage } from './tryme.page';

const routes: Routes = [
  {
    path: '',
    component: TrymePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrymePageRoutingModule {}
