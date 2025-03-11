import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Questionnaire2Component } from './questionnaire2.component';
import {QAComponent} from "./qa/qa.component";


const routes: Routes = [{ path: '', component: Questionnaire2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule { }
