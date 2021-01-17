import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatmentPageRoutingModule } from './treatment-routing.module';

import { TreatmentPage } from './treatment.page';
import { CreateMedicationComponent } from './create-medication/create-medication.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CreateHygieneCareComponent } from './create-hygiene-care/create-hygiene-care.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreatmentPageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [TreatmentPage, CreateMedicationComponent, CreateHygieneCareComponent]
})
export class TreatmentPageModule {

}
