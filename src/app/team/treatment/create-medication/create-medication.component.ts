import { Component, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Medication } from '../medication/medication.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-medication',
  templateUrl: './create-medication.component.html',
  styleUrls: ['./create-medication.component.scss'],
})
export class CreateMedicationComponent implements OnInit {
  @ViewChild('medicationForm')
  form: NgForm;
  @Input()
  medication: Medication = {} as Medication;
  pillsCountFinished: number;
  searchCustomer: string;

  showPillsIntakeDetail = false;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  onCancelMedicationForm() {
    this.modalCtrl.dismiss(null, 'cancleMedicationForm', 'medicationModal')
  }
  seachCustomer: string;
  onSearchCustomer(ev: any) {
    console.log(ev)
  }
  onpillsCountChange() {
    if (this.form.value['intake-frequency'] === undefined || this.form.value['intake-frequency'] === '' || +this.form.value['intake-frequency'] === 0) {
      this.showPillsIntakeDetail = false;
      return;
    } else {
      this.showPillsIntakeDetail = true;

    }

    if (
      this.form.value['pills-count'] &&
      this.form.value['day-intake-frequency'] &&
      this.form.value['doses'] &&
      this.form.value['intake-frequency']
    ) {

      console.log(" all are checked");
      this.pillsCountFinished = (this.form.value['pills-count'] / (this.form.value['doses'] * this.form.value['day-intake-frequency'])) * this.form.value['intake-frequency'];
      this.pillsCountFinished = Math.floor(this.pillsCountFinished);
      return;
    } else {
      this.pillsCountFinished = NaN;
    }
  }


  onAddMedication() {
    const daysTillPillsFinished = +this.form.value['pills-count'] / (+this.form.value['intake-frequency'] * +this.form.value['dose']);
    console.log(this.form.value['pills-count']);
    console.log("checking for doses", this.form.value['doses']);
    console.log((this.form.value['pills-count'] / (this.form.value['doses'] * this.form.value['day-intake-frequency'])) * this.form.value['intake-frequency']);
    const medicationData = new Medication(
      'medication',
      this.form.value['name'],
      this.form.value['pills-count'],
      this.form.value['intake-frequency'],
      this.form.value['doses'],
      this.form.value['customer-id'],
      this.form.value['staff-level'],
      this.form.value['start-date'],
      this.form.value['day-intake-frequency'],
      this.pillsCountFinished,
      this.form.value['pills-reminder'],
      this.form.value['pzn'])
    this.modalCtrl.dismiss(medicationData, 'addMedication', 'medicationModal')
  }

}
