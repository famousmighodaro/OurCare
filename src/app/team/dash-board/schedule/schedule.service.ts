import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private firestore: AngularFirestore) { }

  getSchedule(): Observable<ISchedule[]> {
    return this.firestore.collection<ISchedule>('schedules').valueChanges();
  }

  createSchedule(schedule: ISchedule) {
    return this.firestore.collection('schedules').add(schedule)
  }

  updateSchedule(scheduleId: string, schedule: ISchedule) {
    return this.firestore.doc('schedules/' + scheduleId).update(schedule);

  }

  deleteSchedule(scheduleId: string) {
    this.firestore.doc('schedules/' + scheduleId).delete();
  }

  getTodaySchedule(): Observable<ISchedule[]> {
    let hours = Number(new Date().getHours() - new Date().getHours());
    const startDate = new Date(Date.now()).setHours(hours);
    const endDate = new Date(Date.now()).setHours(hours + 23);

    return this.firestore.collection<ISchedule>('schedules', ref => ref.where('start', '>', new Date(startDate)).where('start', '<', new Date(endDate))).snapshotChanges()
      .pipe(map(actions => actions.map(responseData => {
        const data = responseData.payload.doc.data();
        const id = responseData.payload.doc.id;
        return { id, ...data };
      })));
  }

  getThisWeekSchedule(): Observable<ISchedule[]> {
    let todayDate = new Date(new Date().setHours(0, 0, 0, 0));
    const lastDayofWeek = todayDate.getDate() - (todayDate.getDay() - 1) + 5;
    const firstDayOfWeek = todayDate.getDate() - (todayDate.getDay() - 1);
    const startOfWeekDate = new Date(todayDate.setDate(firstDayOfWeek));
    const endOfWeekDate = new Date(todayDate.setDate(lastDayofWeek));

    return this.firestore.collection<ISchedule>('schedules', ref =>
      ref.where('start', '>=', startOfWeekDate)
        .where('start', '<=', endOfWeekDate)).snapshotChanges()
      .pipe(map(actions => actions.map(responseData => {
        const data = responseData.payload.doc.data();
        const id = responseData.payload.doc.id;
        return { id, ...data };
      })));
  }


}


export interface ISchedule {
  id?: string;
  staffId?: string
  treatmentId?: string
  customerId?: string;
  day?: Date;
  title: string;
  color?: string;
  start: any;
  end: any;
  duration?: number;
  address: string;
  status: string;
  completed: boolean;
  task?: Array<any>;
}
