import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeesService } from './employees.service';
import { NgForm } from '@angular/forms';

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

  levels: any[] = [];
  constructor(private createEmployeeModalCtrl: ModalController,
    private employeeService: EmployeesService,
    private firestore: AngularFirestore) { }

  ngOnInit() {
    this.employeeService.getAllEmployee().subscribe(response => {
      this.employees = response;
    })
    this.firestore.collection('level').valueChanges().subscribe(response => {
      this.levels = response;
    })

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

    this.employeeService.getAllEmployee().subscribe(response => {
      this.employees = response;
    })
  }

}
