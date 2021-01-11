import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { EmployeeLevel } from './level.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLevelService {

  constructor(private firestore: AngularFirestore) { }

  getEmployeeLevels(): Observable<EmployeeLevel[]> {
    return this.firestore.collection<EmployeeLevel>('level').valueChanges();
  }
}
