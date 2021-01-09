import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashBoardPage } from './dash-board.page';

const routes: Routes = [
  {
    path: '',
    component: DashBoardPage
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashBoardPageRoutingModule {}
