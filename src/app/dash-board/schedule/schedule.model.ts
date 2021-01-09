export class Schedule {
    id?: string;
    title: string;
    start: Date;
    end: Date;
    task?: Array<any>;
    userId: string;
    patientId: string;
}