import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Medication } from './medication/medication.model';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAllTreatments() {
    this.firestore.collection('');
  }

  createMedication(medication: Medication) {

    this.firestore.collection<Medication>('treatment').add(
      {
        treatmentType: medication.treatmentType,
        name: medication.name,
        pillsCount: medication.pillsCount,
        intakeFrequency: medication.intakeFrequency ? medication.intakeFrequency : null,
        dayIntakeFrequency: medication.dayIntakeFrequency ? medication.dayIntakeFrequency : NaN,
        doses: medication.doses,
        customerId: medication.customerId,
        staffLevel: medication.staffLevel,
        startDate: medication.startDate ? medication.startDate : null,
        pillsCountFinished: medication.pillsCountFinished ? medication.pillsCountFinished : NaN,
        pillsReminder: medication.pillsReminder ? medication.pillsReminder : null,
      }
    ).catch(err => {
      console.log("no optional ", err);
    });
  }

}
