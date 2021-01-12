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
    this.firestore.collection<Customer>('customer').doc().set(customer);
  }

  geAllCustomers(): Observable<Customer[]> {
    return this.firestore.collection<Customer>('customer').snapshotChanges().pipe(
      map(actions => actions.map(resultData => {
        const data = resultData.payload.doc.data() as Customer;
        const id = resultData.payload.doc.id;
        return { id, ...data }
      })));
  }
}
