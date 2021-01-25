import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamPage } from './team.page';
import { AuthGuard } from '../login/auth.guard';

const routes: Routes = [
  {
    path: 't',
    component: TeamPage,
    children: [
      {
        path: 'dash-board',
        children: [
          {
            path: '',
            loadChildren: () => import('./dash-board/dash-board.module').then(m => m.DashBoardPageModule),

          },
        ]
      },

      {
        path: 'treatment',
        loadChildren: () => import('./treatment/treatment.module').then(m => m.TreatmentPageModule),

      },

    ]
  },

  {
    path: '',
    redirectTo: '/team/t/dash-board',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamPageRoutingModule { }
