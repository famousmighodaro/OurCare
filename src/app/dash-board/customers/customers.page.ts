import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { Customer } from './customer.model';
import { CustomerService } from './create-customer/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  customer: Customer;
  constructor(
    private createCustomerModal: ModalController,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
  }

  onOpenNewCustomerForm() {
    this.createCustomerModal.create(
      {
        component: CreateCustomerComponent,
        componentProps: { msg: 'we are welcome' },
        id: "newCustomerModalForm"
      },


    ).then(modalEle => {
      modalEle.present();
      return modalEle.onDidDismiss();
    }).then(resultData => {
      if (resultData.role === "onCreateNewCustomer") {
        this.customer = resultData.data.newCustomer.customer;
        this.customerService.createCustomer(this.customer);
      }
    })
  }

}
