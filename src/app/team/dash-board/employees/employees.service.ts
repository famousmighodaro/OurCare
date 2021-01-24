import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private firestore: AngularFirestore) { }

  createEmployee(employee: Employee) {
    return this.firestore.collection('users').add({
      firstName: employee.firstName,
      lastName: employee.lastName,
      dateOfBirth: new Date(employee.dateOfBirth),
      level: employee.level,
      status: employee.status,
      schedules: [
        { name: 'uwa' },
        { name: 'mary' }
      ]
    }).then(res => {
      console.log(res.id);
    }).catch(e => {
      console.log("error: ", e)
    });
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.firestore.collection<Employee>('users').snapshotChanges().pipe(
      map(actions => actions.map(responseData => {
        const data = responseData.payload.doc.data();
        const id = responseData.payload.doc.id;
        return { id, ...data };
      })));
  }

  filterEmployeeBy(filterBy: string): Observable<Employee[]> {
    return this.firestore.collection<Employee>('users', ref => ref.where('level', '==', filterBy)).snapshotChanges().pipe(
      map(actions => actions.map(responseData => {
        const data = responseData.payload.doc.data();
        const id = responseData.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getEmployeesByLevel(level: number): Observable<Employee[]> {
    return this.firestore.collection<Employee>('users', ref => ref.where('level', '>=', level)).snapshotChanges().pipe(
      map(actions => actions.map(responseData => {
        const data = responseData.payload.doc.data();
        const id = responseData.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
