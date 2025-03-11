import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireComponent } from './questionnaire.component';
import { QAComponent } from './qa/qa.component';

import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    QuestionnaireComponent,
    QAComponent
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    FormsModule
  ],
  exports:[
    QuestionnaireComponent
  ]
})
export class QuestionnaireModule {


}
