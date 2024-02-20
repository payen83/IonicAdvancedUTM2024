import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsyncPageRoutingModule } from './async-routing.module';

import { AsyncPage } from './async.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsyncPageRoutingModule
  ],
  declarations: [AsyncPage]
})
export class AsyncPageModule {}
