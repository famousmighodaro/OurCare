import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrymePageRoutingModule } from './tryme-routing.module';

import { TrymePage } from './tryme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrymePageRoutingModule
  ],
  declarations: [TrymePage]
})
export class TrymePageModule {}
