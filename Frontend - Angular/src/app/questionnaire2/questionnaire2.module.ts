import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire2-routing.module';
import { Questionnaire2Component } from './questionnaire2.component';
import { QAComponent } from './qa/qa.component';

import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    Questionnaire2Component,
    QAComponent
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    FormsModule
  ],
  exports:[
    Questionnaire2Component
  ]
})
export class Questionnaire2Module {


}
