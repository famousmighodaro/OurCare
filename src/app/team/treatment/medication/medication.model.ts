export class Medication {

    constructor(
        public treatmentType: string,
        public name: string,
        public pillsCount: number,
        public intakeFrequency: string,
        public doses: number,
        public customerId: string,
        public staffLevel: number,
        public startDate: Date,
        public customerName?: string,
        public dayIntakeFrequency?: number,
        public pillsCountFinished?: number,
        public pillsReminder?: number,
        public pzn?: number,
        public id?: string,

    ) { }
}