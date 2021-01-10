import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { setOptions } from '@mobiscroll/angular';
import { isObservable, Observable, Subscription } from 'rxjs';
import { MbscEventcalendarOptions,  } from '@mobiscroll/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ScheduleService, ISchedule } from './schedule.service';
import { SegmentChangeEventDetail } from '@ionic/core';


setOptions({
  theme: 'material',
  themeVariant: 'dark', 
});
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  public scheduleList: Observable<any[]>;
  events: any[] =[];
  eventDate: Date[];
  constructor(private http: HttpClient, private firestore: AngularFirestore, 
    private scheduleService: ScheduleService) { }
  
  
  check(): void{
   
 /* this.firestore.collection('schedules').valueChanges().subscribe((res: any) =>{
   
  this.events = res;
 }); */
 let todayDate = new Date();
 const lastDayofWeek = todayDate.getDate() - (todayDate.getDay()-1) + 6;
 const firstDayOfWeek = todayDate.getDate() - (todayDate.getDay()-1);
 const startOfWeekDate = new Date(todayDate.setDate(firstDayOfWeek));
 const endOfWeekDate = new Date(todayDate.setDate(lastDayofWeek));
 
 console.log('the week start: ' + startOfWeekDate.toString() + " and end on these day: "+ endOfWeekDate.getUTCDate() );


 

 
}
 

  ngOnInit(){
    this.scheduleService.getTodaySchedule().subscribe(values =>{
      this.events=values;
    });
   
  }

  details(schedules: any){
    console.log("checking for details", schedules);
  }

  scheduleViewChange(ev: CustomEvent<SegmentChangeEventDetail>){
    if(ev.detail.value==="day"){
      this.scheduleService.getTodaySchedule().subscribe((values: ISchedule[]) =>{
        this.events=values;
      });
      return;
    }
    this.scheduleService.getThisWeekSchedule().subscribe(values =>{
      this.events=values;
    });
  }
 

}
