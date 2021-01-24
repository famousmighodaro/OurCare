import { Component, Input, OnInit } from '@angular/core';
import { ISchedule, ScheduleService } from '../schedule.service';
import { ModalController } from '@ionic/angular';
import { TreatmentService } from '../../../treatment/treatment.service';
import { Medication } from '../../../treatment/medication/medication.model';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss'],
})
export class ScheduleDetailsComponent implements OnInit {
  @Input()
  loadedSchedule: ISchedule;
  @Input()
  customerTreatment: Medication;
  treatment: Medication;
  countDownTimer: number;
  countDownSeconds: number;
  disableStartBtn = false;
  showDoneBtn = false;
  constructor(
    private modalCtrl: ModalController,
    private treatmentService: TreatmentService,
    private scheduleService: ScheduleService
  ) {


  }

  ngOnInit() {
    if (this.loadedSchedule.status === 'in pool') {
      this.showDoneBtn = false;
    } else if (this.loadedSchedule.status === 'in progress' && this.disableStartBtn === false) {
      this.showDoneBtn = true;
    }
    if (this.loadedSchedule.status !== 'in pool') {
      this.disableStartBtn = true;
    }
  }

  onCancelScheduleDetailModal() {
    this.modalCtrl.dismiss(null, 'cancelScheduleDetailsModal', 'scheduleDetailsModal')
  }

  isStartTime() {
    return (new Date().getTime() >= new Date(this.loadedSchedule.start.seconds * 1000 + 300000).getTime());
  }

  onStartTreatment(event) {

    this.loadedSchedule.status = "in progress";
    this.loadedSchedule.color = "warning"
    this.scheduleService.updateSchedule(this.loadedSchedule.id, this.loadedSchedule);
    this.disableStartBtn = true;
    this.showDoneBtn = true;
    this.countDownSeconds = 60;
    this.countDownTimer = this.loadedSchedule.duration;
    let setSecondsinterval = setInterval(() => {
      this.countDownSeconds -= 1;
      if (this.countDownSeconds === 0 && this.countDownTimer !== 0) {

        this.countDownTimer = this.countDownTimer - 1;
        this.countDownSeconds = 60;
      }
      if (this.countDownTimer === 0) {
        clearInterval(setSecondsinterval);

      }
    }, 1000)
  }

  onTreatmentDone(event) {

    this.loadedSchedule.completed = true;
    this.loadedSchedule.status = "completed"
    this.loadedSchedule.color = "success";
    this.scheduleService.updateSchedule(this.loadedSchedule.id, this.loadedSchedule)
  }
}
