import { Schedule } from "../schedule/schedule.model";

export class User{
    name: string;
    level: number;
    profession: string;
    status: string;
    schedules? :Array<Schedule>; 
    currentActivity? : string;

}