import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPageRoutingModule } from './form-routing.module';

import { FormPage } from './form.page';
import { AlertComponentModule } from 'src/app/components/alert/alert.module';
import { TransformPipeModule } from 'src/app/pipes/transform.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPageRoutingModule,
    AlertComponentModule,
    TransformPipeModule
  ],
  declarations: [FormPage]
})
export class FormPageModule {}
