import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationPageRoutingModule } from './medication-routing.module';

import { MedicationPage } from './medication.page';
import { CreateMedicationComponent } from '../create-medication/create-medication.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicationPageRoutingModule
  ],
  declarations: [MedicationPage]
})
export class MedicationPageModule { }
