
import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { CreateHygieneCareComponent } from './create-hygiene-care/create-hygiene-care.component';
import { CreateMedicationComponent } from './create-medication/create-medication.component';
import { MedicationPage } from './medication/medication.page';
import { TreatmentService } from './treatment.service';



@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.page.html',
  styleUrls: ['./treatment.page.scss'],
})
export class TreatmentPage implements OnInit {
  tryme = false;
  constructor(
    private addMedicationModalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private treatmentService: TreatmentService,

  ) { }

  ngOnInit() {

  }

  addMedication() {
    this.addMedicationModalCtrl.create({
      component: CreateMedicationComponent,
      componentProps: {
        doseDetails: false,
      },
      id: "medicationModal"
    }).then(modalEle => {
      modalEle.present();
      return modalEle.onDidDismiss();
    }).then(resultData => {

      if (resultData.role === "addMedication") {
        console.log("result data---- ", resultData.data.doses);
        this.treatmentService.createMedication(resultData.data);
      }
    });
  }

  addHygieneCare() {
    this.addMedicationModalCtrl.create({
      component: CreateHygieneCareComponent,
      id: "hygieneCare"
    }).then(modalEle => {
      modalEle.present();
    });
  }


}
