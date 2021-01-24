import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { isObservable, Observable, Subscription } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { ScheduleService, ISchedule } from './schedule.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { CalendarView } from 'angular-calendar';
import * as _ from 'lodash';
import { cloneDeep, sortBy } from 'lodash';
import { IonItemSliding, LoadingController, ModalController } from '@ionic/angular';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { Router } from '@angular/router';
import { ScheduleDetailsComponent } from './schedule-details/schedule-details.component';
import { TreatmentService } from '../../treatment/treatment.service';
import { Medication } from '../../treatment/medication/medication.model';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  events: any[] = [];
  view = "day";
  eventDate: Date[];
  group: any[] = [];
  weekEvent: any = {}
  schedule: ISchedule;
  previousTour: string;
  currentTour: string;
  nextTour: string;
  currentTourCounter: number = 0;



  constructor(
    private firestore: AngularFirestore,
    private scheduleService: ScheduleService,
    private createScheduleModal: ModalController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private treatmentService: TreatmentService
  ) { }


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
      console.log(this.events)
    });

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
      for (let key in this.weekEvent) {
        if (this.weekEvent.hasOwnProperty(key)) {
          this.group.push({ key, values: this.weekEvent[key] });
        }
      }
    });
  }


  onOpenNewScheduleForm() {
    this.createScheduleModal.create({
      component: CreateScheduleComponent,
      id: 'newScheduleModalForm',
    }).then(modalEle => {
      modalEle.present();
      return modalEle.onDidDismiss();
    }).then(resultData => {
      //console.log(resultData.data);
      if (resultData.role === "createSchedule") {
        console.log('I just created a schedule', resultData.data);
        this.schedule = resultData.data;
        this.scheduleService.createSchedule(this.schedule);
      }
    });
  }

  onTour(tourId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'team', 't', 'dash-board', 'schedule', tourId])
  }

  onCompleted(tourId: string, startDate, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log(new Date(startDate.seconds * 1000))
    console.log(new Date((startDate.seconds * 1000) + 3600000))
    return (new Date().getTime() >= new Date(startDate.seconds * 1000).getTime());
    //this.router.navigate(['/', 'team', 't', 'dash-board', 'schedule', tourId])

  }

  onShowScheduleDetails(event) {
    let customerTreatmentDetails: Medication;
    this.treatmentService.getTreatment(event.treatmentId).subscribe(respons => {
      customerTreatmentDetails = respons[0];
      console.log(customerTreatmentDetails);
      this.createScheduleModal.create({
        component: ScheduleDetailsComponent,
        componentProps: {
          loadedSchedule: event,
          customerTreatment: customerTreatmentDetails,
        },
        id: 'scheduleDetailsModal'
      }).then(modalEle => {
        modalEle.present();
        return modalEle.onDidDismiss();
      })

    })

  }

}
