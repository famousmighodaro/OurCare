import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../customer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  createCustomer(customer: Customer) {
    this.firestore.collection('customers').add({
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: new Date(customer.dateOfBirth),
      level: +customer.level,
      status: customer.status
    });
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.firestore.collection<Customer>('customers').snapshotChanges().pipe(
      map(actions => actions.map(resultData => {
        const data = resultData.payload.doc.data() as Customer;
        const id = resultData.payload.doc.id;
        return { id, ...data }
      })));
  }

  getCustomer(id: string): Observable<Customer[]> {
    return this.firestore.collection<Customer>('customers', ref => ref.where('__name__', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(resultData => {
        const data = resultData.payload.doc.data() as Customer;
        const id = resultData.payload.doc.id;
        return { id, ...data }
      })));
  }
}
