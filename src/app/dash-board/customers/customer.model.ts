export interface Customer {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    level: number;
    status: string;
    precription?: Array<any>;
}