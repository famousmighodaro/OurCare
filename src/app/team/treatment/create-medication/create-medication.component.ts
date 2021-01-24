import { Component, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Medication } from '../medication/medication.model';
import { NgForm } from '@angular/forms';
import { Customer } from '../../dash-board/customers/customer.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CustomerService } from '../../dash-board/customers/create-customer/customer.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

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
  customers: Customer[] = [];
  encodeData: any;
  scannedMedication: Pills[] = [{
    pzn: null,
    name: null,
    pillsCount: null
  }];
  scannedData: string;
  barcodeScannerOptions: BarcodeScannerOptions;

  showPillsIntakeDetail = false;

  constructor(
    private modalCtrl: ModalController,
    private firestore: AngularFirestore,
    private customerService: CustomerService,
    private barcodeScanner: BarcodeScanner
  ) {
    this.getCustomers();
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  ngOnInit() {

  }
  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {

      this.scannedData = barcodeData.text.substring(1);
      this.getMedication(barcodeData.text.substring(1));
      return barcodeData.text.substring(1);

    }).then(resultDatas => {
      alert(`PZN: ${resultDatas}`)
    }).catch(err => {
      console.log("barcode Error " + err);
      return;
    });


  }
  getMedication(seachInput: string) {
    this.firestore.collection<any>('pills', ref => ref.where('pzn', '==', seachInput)).valueChanges().subscribe(resultData => {
      this.scannedMedication = resultData;
      console.log(this.scannedMedication);
    })

  }
  getCustomers() {
    this.customerService.getAllCustomers().subscribe(resultData => {
      console.log(resultData);
      this.customers = resultData;
      console.log(this.customers);
    });
  }
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

  life = "we are one";
  onAddMedication() {
    const daysTillPillsFinished = +this.form.value['pills-count'] / (+this.form.value['intake-frequency'] * +this.form.value['dose']);
    let medicationData: Medication
    this.customerService.getCustomer(this.form.value['customer-id']).subscribe(respons => {
      medicationData = new Medication(
        'medication',
        this.form.value['name'],
        this.form.value['pills-count'],
        this.form.value['intake-frequency'],
        this.form.value['doses'],
        this.form.value['customer-id'],
        this.form.value['staff-level'],
        this.form.value['start-date'],
        respons[0].firstName + " " + respons[0].lastName,
        this.form.value['day-intake-frequency'],
        this.pillsCountFinished,
        this.form.value['pills-reminder'],
        this.form.value['pzn']
      )
      medicationData.customerName = `${respons[0].firstName} ${respons[0].lastName}`;
      this.modalCtrl.dismiss(medicationData, 'addMedication', 'medicationModal')
    })



  }

}


export interface Pills {
  pzn: string;
  name: string;
  pillsCount: string;
}