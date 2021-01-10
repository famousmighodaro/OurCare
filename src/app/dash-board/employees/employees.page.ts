import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {
  employee: Employee;
  msg = "Welcome to me";
  filterOption: any = {
    header: 'Filter by:',
  }
  constructor(private createEmployeeModalCtrl: ModalController, private employeeService: EmployeesService) { }

  ngOnInit() {
  }

  addEmployee() {
    console.log("add employee");

    this.createEmployeeModalCtrl.create({
      component: CreateEmployeeComponent,
      componentProps: {
        employee: Employee
      },
      id: "createEmployeeModalCtrl"
    }).then(modalEle => {
      modalEle.present();
      return modalEle.onDidDismiss();
    }).then(resultData => {
      //console.log(resultData.data);
      if (resultData.role === "createEmployee") {
        this.employee = resultData.data.employeeData.employee;
        console.log(this.employee.firstName);
        this.employeeService.createEmployee(this.employee);
      }
    });

  }

}
