import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Medication } from './medication/medication.model';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../dash-board/customers/customer.model';

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
        const data = responseData.payload.doc.data() as Medication;
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
        customerName: medication.customerName,
        pillsCountFinished: medication.pillsCountFinished ? medication.pillsCountFinished : NaN,
        pillsReminder: medication.pillsReminder ? medication.pillsReminder : null,
      }
    ).catch(err => {
      console.log("no optional ", err);
    });
  }

  getTreatmentsByCustomerId(customerId: string): Observable<Medication[]> {
    return this.firestore.collection<Medication>('treatment', ref => ref.where('customerId', '==', customerId)).snapshotChanges().pipe(
      map(actions => actions.map(responseData => {
        const data = responseData.payload.doc.data() as Medication;
        const id = responseData.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getTreatment(id: string): Observable<Medication[]> {
    return this.firestore.collection<Medication>('treatment', ref => ref.where('__name__', '==', id)).valueChanges();
  }
}
