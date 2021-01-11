import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmployeeLevel } from './level.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLevelService {

  constructor(private firestore: AngularFirestore) { }

  getEmployeeLevels() {
    return this.firestore.collection('level').valueChanges();
  }

}
