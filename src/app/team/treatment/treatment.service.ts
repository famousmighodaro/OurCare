import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Medication } from './medication/medication.model';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAllTreatments(): Observable<Medication[]> {
    return this.firestore.collection<Medication>('treatment').snapshotChanges().pipe(
      map(actions => actions.map(responseData => {
        const data = responseData.payload.doc.data();
        const id = responseData.payload.doc.id;
        return { id, ...data };
      }))
    )
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
