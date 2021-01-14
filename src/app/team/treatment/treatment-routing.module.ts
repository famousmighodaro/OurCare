import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreatmentPage } from './treatment.page';

const routes: Routes = [
  {
    path: '',
    component: TreatmentPage
  },
  {
    path: 'medication',
    loadChildren: () => import('./medication/medication.module').then( m => m.MedicationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatmentPageRoutingModule {}
