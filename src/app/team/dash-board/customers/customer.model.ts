import { Prescription } from './prescription.model';
import { Observable } from 'rxjs';
export class Customer {

    constructor(
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public level: number,
        public address: string,
        public status: string = "Inactive",
        public id?: string,
        public prescription?: Observable<Prescription[]>,

    ) { }

}