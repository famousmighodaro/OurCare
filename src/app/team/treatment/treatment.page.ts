
import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { CreateMedicationComponent } from './create-medication/create-medication.component';
import { MedicationPage } from './medication/medication.page';


@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.page.html',
  styleUrls: ['./treatment.page.scss'],
})
export class TreatmentPage implements OnInit {

  constructor(
    private addMedicationModalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,

  ) { }

  ngOnInit() {

  }

  addMedication() {
    console.log("add medication");
    this.addMedicationModalCtrl.create({
      component: CreateMedicationComponent
    }).then(modalEle => {
      modalEle.present();
    });
  }


}
