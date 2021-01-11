
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { Employee } from './employee.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { EmployeesService } from './employees.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { EmployeeLevelService } from '../customer/level/employee-level.service';
import { EmployeeLevel } from '../customer/level/level.model';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  employee: Employee;
  employees: any[] = [];
  msg = "Welcome to me";
  form: NgForm;
  filterOption: any = {
    header: 'Filter by:',
  }

  levels: any[] = []

  constructor(private createEmployeeModalCtrl: ModalController,
    private employeeService: EmployeesService,
    private firestore: AngularFirestore,
    private employeeLevelService: EmployeeLevelService) { }

  ngOnInit() {
    this.getEmployees();
    this.employeeLevelService.getEmployeeLevels().subscribe(responses => {
      this.levels = responses
    });


  }

  addEmployee() {
    console.log("add employee");


    this.createEmployeeModalCtrl.create({
      component: CreateEmployeeComponent,
      componentProps: {
        employeeLevels: this.levels
      },
      id: "createEmployeeModalCtrl"
    }).then(modalEle => {
      modalEle.present();
      return modalEle.onDidDismiss();
    }).then(resultData => {
      //console.log(resultData.data);
      if (resultData.role === "createEmployee") {
        this.employee = resultData.data.employeeData.employee;
        this.employeeService.createEmployee(this.employee);
      }
    });
  }

  onSelectLevelChanges(ev: any) {
    if (+ev !== 0) {
      this.employeeService.filterEmployeeBy(ev).subscribe(response => {
        this.employees = response;
      });
      return;
    }
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAllEmployee().subscribe(response => {
      this.employees = response;
    })
  }

}



