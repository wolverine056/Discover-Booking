import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipessPageRoutingModule } from './recipess-routing.module';

import { RecipessPage } from './recipess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipessPageRoutingModule
  ],
  declarations: [RecipessPage]
})
export class RecipessPageModule {}
