import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { vmRoutingModule } from './vm-routing.module';
import { vmComponent } from './vm.component';
import { QAComponent } from './qa/qa.component';
import {FormsModule} from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    vmComponent,
    QAComponent
  ],
  imports: [
    CommonModule,
    vmRoutingModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    InputTextareaModule,
    ButtonModule,
    CardModule
  ],
  exports:[
    vmComponent
  ]
})
export class vmModule {


}
