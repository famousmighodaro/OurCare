import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  onCreateNewcustomer() {
    if (!this.customerForm.valid) {
      return;
    }


  }

  onCancleCreateNewCustomer() {
    this.modalCtrl.dismiss(null, 'cancel', 'newCustomerModalForm');

  }

}
