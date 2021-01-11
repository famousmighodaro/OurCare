import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Employee } from '../employee.model';
import { EmployeeLevel } from '../../customer/level/level.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  @Input()
  employeeLevels: EmployeeLevel;
  @ViewChild('employeeForm')
  form: NgForm;
  employee: Employee;
  constructor(private modalCtr: ModalController) { }

  ngOnInit() { }

  onCreateNewEmployee() {
    if (!this.form.valid) {
      return;
    }
    this.modalCtr.dismiss({
      employeeData: {
        employee: new Employee(
          this.form.value['first-name'],
          this.form.value['last-name'],
          this.form.value['date-of-birth'],
          +this.form.value['level'],
          'new')
      }
    }, 'createEmployee', 'createEmployeeModalCtrl');
  }

  onCancleCreateNewEmployee() {
    this.modalCtr.dismiss(null, 'cancle', 'createEmployeeModalCtrl');
  }

}
