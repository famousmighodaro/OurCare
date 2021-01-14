import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MbscModule } from '@mobiscroll/angular';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';


import { SchedulePage } from './schedule.page';
import { environment } from 'src/environments/environment.prod';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    MbscModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [SchedulePage]
})
export class SchedulePageModule { }
