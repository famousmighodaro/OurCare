export class Customer{
    id?: string;
    name: string;
    hasPrescription: boolean;
    precription: Array<any>;
    contactPerson?: Array<any>;
    dateOfBirth: Date;
    address: string;
    status: string;
}