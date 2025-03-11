import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { Questionnaire2Module } from '../questionnaire2/questionnaire2.module';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { JobsComponent } from './jobs/jobs.component';
import { QuizComponent } from './quiz/quiz.component';



const routes: Routes = [
  {
    path: '', 
    component: HomeLayoutComponent,
    children: [
      { path: 'jobs', component: JobsComponent },
      { path: 'quiz', component: QuizComponent },
      { path: '', redirectTo: '/home/jobs', pathMatch: 'full' } // Default child route
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
