export class Customer{
    id?: string;
    name: string;
    hasPrescription: boolean;
    prescription: Array<any>;
    contactPerson?: Array<any>;
    dateOfBirth: Date;
    address: string;
    status: string;
}