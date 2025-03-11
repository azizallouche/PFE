import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { Questionnaire2Module } from '../questionnaire2/questionnaire2.module';
import { JobsComponent } from './jobs/jobs.component';
import { QuizComponent } from './quiz/quiz.component';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    JobsComponent,
    QuizComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    QuestionnaireModule,
    Questionnaire2Module
  ]
})
export class LayoutsModule { }
