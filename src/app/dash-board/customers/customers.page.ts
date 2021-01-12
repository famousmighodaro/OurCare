import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  constructor(private createCustomerModal: ModalController) { }

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
    });
  }

}
