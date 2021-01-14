import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashBoardPage } from './dash-board.page';

const routes: Routes = [
  {
    path: '',
    component: DashBoardPage,
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.SchedulePageModule)
  },

  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashBoardPageRoutingModule { }
