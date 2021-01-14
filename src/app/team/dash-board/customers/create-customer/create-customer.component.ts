import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnInit {
  @Input()
  msg: string;
  @ViewChild('customerForm')
  customerForm: NgForm;
  customer: Customer;
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  onCreateNewcustomer() {
    if (!this.customerForm.valid) {
      return;
    }
    this.modalCtrl.dismiss({
      newCustomer: {
        customer: new Customer(
          this.customerForm.value['first-name'],
          this.customerForm.value['last-name'],
          this.customerForm.value['date-of-birth'],
          +this.customerForm.value['level']
        )
      }
    }, 'onCreateNewCustomer', 'newCustomerModalForm');

  }

  onCancleCreateNewCustomer() {
    this.modalCtrl.dismiss(null, 'cancel', 'newCustomerModalForm');

  }

}
