import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomerService } from '../../customers/create-customer/customer.service';
import { Customer } from '../../customers/customer.model';
import { NgForm } from '@angular/forms';
import { TreatmentService } from '../../../treatment/treatment.service';
import { Medication } from '../../../treatment/medication/medication.model';
import { EmployeeLevelService } from '../../employees/level/employee-level.service';
import { EmployeeLevel } from '../../employees/level/level.model';
import { EmployeesService } from '../../employees/employees.service';
import { Employee } from '../../employees/employee.model';
import { ISchedule } from '../schedule.service';
import { title } from 'process';


@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss'],
})
export class CreateScheduleComponent implements OnInit {
  today = new Date().toISOString();

  customers: Customer[] = [];
  selectedCustomer: Customer[] = [];
  treatments: Medication[] = [];
  employeeLevels: EmployeeLevel[] = [];
  selectedTreatment: Medication[] = [];
  employees: Employee[] = [];
  startDate: string;
  endTime: string;
  minEndTime: string;
  duration: number;
  @ViewChild('scheduleForm')
  form: NgForm;
  showMedication = false;
  showEmployeeLevel = false;


  constructor(
    private modalCtrl: ModalController,
    private customerService: CustomerService,
    private treatmentService: TreatmentService,
    private employeeLevelService: EmployeeLevelService,
    private employeeService: EmployeesService,
  ) {
    customerService.getAllCustomers().subscribe(response => {
      this.customers = response;
      console.log(this.customers)
    })
  }

  ngOnInit() { }

  onCancleScheduleForm() {
    this.modalCtrl.dismiss(null, 'cancelScheduleForm', 'newScheduleModalForm');
  }

  /* id?: string;
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
  completed: boolean;
  task?: Array<any>; */
  onSubmitScheduleForm() {
    if (!this.form.valid) {
      return;
    }
    const newSchedule = {
      staffId: this.form.value['staff-id'],
      treatmentId: this.form.value['treatment-id'],
      start: new Date(this.form.value['start-time']),
      end: new Date(this.form.value['end-time']),
      title: this.selectedCustomer[0].firstName + " " + this.selectedCustomer[0].lastName,
      customerId: this.form.value['customer-id'],
      duration: this.duration,
      address: this.form.value['address'],
      completed: false,
      status: 'in pool',
    } as ISchedule
    console.log("I want to create a new schedule")
    this.modalCtrl.dismiss(newSchedule, 'createSchedule', 'newScheduleModalForm')
  }
  async onSelectCustomer(value) {
    this.showMedication = true;
    await this.treatmentService.getTreatmentsByCustomerId(value).subscribe(respons => {
      this.treatments = respons;
    });
    await this.customerService.getCustomer(value).subscribe(respons => {
      this.selectedCustomer = respons;
      console.log("Selected customer", respons);
    });

  }


  onStartTimeChange(val) {
    this.diffMinutes()
    console.log("Date change", val);

  }
  onStartDateChange(ev) {

    this.startDate = new Date(ev.detail.value).toISOString()
    this.endTime = this.startDate;
    const mins = new Date(ev).getMinutes() + 15;
    this.diffMinutes();
  }
  onEndTimeChange(endTime) {
    this.endTime = endTime.detail.value;
    console.log(this.endTime)
    this.diffMinutes();
  }


  onSelectTreatment(value) {
    let level;
    this.treatmentService.getTreatment(value).subscribe(v => {
      this.selectedTreatment = v;

      console.log("selected treatment", v)
      this.showEmployeeLevel = true;
      this.employeeLevelService.getEmployeeLevel(+this.selectedTreatment[0].staffLevel).subscribe(respons => {
        this.employeeLevels = respons;
        console.log('staff level', respons)
      })

      this.employeeService.getEmployeesByLevel(+this.selectedTreatment[0].staffLevel).subscribe(respons => {
        this.employees = respons;
        console.log('staff data', respons)
      })
    });
  }

  diffMinutes() {
    let diff = (new Date(this.endTime).getTime() - new Date(this.startDate).getTime()) / 1000;
    diff /= 60;
    diff = Math.abs(Math.round(diff));
    this.duration = diff;
  }
}
