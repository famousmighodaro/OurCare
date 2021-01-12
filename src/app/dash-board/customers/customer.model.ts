import { Prescription } from './prescription.model';
import { Observable } from 'rxjs';
export class Customer {

    constructor(
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public level: number,
        public status: string = "Inactive",
        public prescription?: Observable<Prescription[]>,
    ) { }

}