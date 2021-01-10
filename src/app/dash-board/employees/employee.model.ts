import { Schedule } from "../schedule/schedule.model";

export class Employee {


    constructor(
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public level: number,
        public status: string,
        public schedules?: Array<Schedule>,
        public profession?: string,
        public currentActivity?: string
    ) {

    }

}