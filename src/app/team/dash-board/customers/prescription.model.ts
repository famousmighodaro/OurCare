export interface Prescription {
    id?: string;
    customerId: string;
    title: string;
    tablet: boolean;
    doses: number;
    tabletTotalPieces: number;
    howManyTimesDaily: number;
    dailyDoses: number;
    finishedDays: number;
}