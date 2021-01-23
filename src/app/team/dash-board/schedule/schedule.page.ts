import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { isObservable, Observable, Subscription } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { ScheduleService, ISchedule } from './schedule.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { CalendarView } from 'angular-calendar';
import * as _ from 'lodash';
import { cloneDeep, sortBy } from 'lodash';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  public scheduleList: Observable<any[]>;
  events: any[] = [];
  view = "day";
  eventDate: Date[];
  group: any[] = [];
  weekEvent: any = {}
  @ViewChild('scheduleDay')
  daily: string;


  viewDate: Date = new Date();
  constructor(private http: HttpClient, private firestore: AngularFirestore,
    private scheduleService: ScheduleService) { }


  check(): void {

    /* this.firestore.collection('schedules').valueChanges().subscribe((res: any) =>{
      
     this.events = res;
    }); */
    let todayDate = new Date();
    const lastDayofWeek = todayDate.getDate() - (todayDate.getDay() - 1) + 6;
    const firstDayOfWeek = todayDate.getDate() - (todayDate.getDay() - 1);
    const startOfWeekDate = new Date(todayDate.setDate(firstDayOfWeek));
    const endOfWeekDate = new Date(todayDate.setDate(lastDayofWeek));

    console.log('the week start: ' + startOfWeekDate.toString() + " and end on these day: " + endOfWeekDate.getUTCDate());





  }


  ngOnInit() {
    this.scheduleService.getTodaySchedule().subscribe(values => {
      this.events = values;

      /* values.forEach(value => {
        this.events.push({ start: new Date(value.start), end: new Date(value.end), title: value.title });
      }); */
    });

  }

  details(schedules: any) {
    console.log("checking for details", schedules);
  }

  scheduleViewChange(ev: CustomEvent<SegmentChangeEventDetail>) {
    this.group = [];
    this.events = [];
    this.group = [];
    this.weekEvent = [];
    if (ev.detail.value === "day") {
      this.group = [];
      this.weekEvent = [];
      this.view = 'day'
      this.scheduleService.getTodaySchedule().subscribe((values: ISchedule[]) => {
        this.events = [];
        this.events = values;
      });
      return;
    }
    this.scheduleService.getThisWeekSchedule().subscribe((values) => {
      this.view = "week";
      this.group = [];
      this.weekEvent = [];
      this.events = []
      values.forEach(value => {
        const start = new Date(new Date(new Date(0).setUTCSeconds(value.start['seconds'])).setHours(0, 0, 0, 0));
        this.events.push({ day: start, ...value })
        this.events.sort();
      });
      this.weekEvent = _.groupBy(this.events, n => {
        return [n.day];
      })
      console.log(this.events)
      for (let key in this.weekEvent) {
        if (this.weekEvent.hasOwnProperty(key)) {
          this.group.push({ key, values: this.weekEvent[key] })

        }
      }


    });


  }

}
