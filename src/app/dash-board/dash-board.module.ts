import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashBoardPageRoutingModule } from './dash-board-routing.module';

import { DashBoardPage } from './dash-board.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MbscScroller } from '@mobiscroll/angular/dist/js/angular/components/scroller';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashBoardPageRoutingModule, NgCircleProgressModule.forRoot({
      radius: 100,
    outerStrokeWidth: 16,
    innerStrokeWidth: 8,
    outerStrokeColor: "#78C000",
    innerStrokeColor: "#C7E596",
    animationDuration: 300,
    })
  ],
  declarations: [DashBoardPage]
})
export class DashBoardPageModule {}
