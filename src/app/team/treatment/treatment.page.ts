import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.page.html',
  styleUrls: ['./treatment.page.scss'],
})
export class TreatmentPage implements OnInit {

  constructor(private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

  addMedication() {
    console.log("add medication")
  }
  onTreatment() {
    const actionSheet = this.actionSheetCtrl.create({
      header: 'Treatment',
      buttons: [
        {
          text: 'Medication',
          role: 'medication',
          handler: this.addMedication,
        },
        {
          text: 'cleaning',
          role: 'cleaning',
          handler: this.addMedication,
        },
      ],

    })
    actionSheet.then(actionSheetEle => {
      actionSheetEle.present();
      console.log(actionSheet);
    });
  }
}
