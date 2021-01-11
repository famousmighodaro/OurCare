import { Prescription } from './prescription.model';
import { Observable } from 'rxjs';
export interface Customer {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    level: number;
    status: string;
    prescription?: Observable<Prescription[]>;
}