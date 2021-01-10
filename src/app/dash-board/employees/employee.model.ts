import { Schedule } from "../schedule/schedule.model";
export class Employee{
    name: string;
    level: number;
    profession: string;
    status: string;
    schedules? :Array<Schedule>; 
    currentActivity? : string;

}