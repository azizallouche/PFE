import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { UsersComponent } from './users/users.component';
import { JobsComponent } from './jobs/jobs.component';
import { AddjobComponent } from './addjob/addjob.component';
import { JobsresultsComponent } from './jobsresults/jobsresults.component';
import { JobresultsinfoComponent } from './jobresultsinfo/jobresultsinfo.component';
import { AddhrComponent } from './addhr/addhr.component';

const routes: Routes = [
  {
    path: '', 
    component: DashboardHomeComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'addjob', component: AddjobComponent },
      { path: 'jobsresults', component: JobsresultsComponent },
      { path: 'jobsresultdesc', component: JobresultsinfoComponent },
      { path: 'addhr', component: AddhrComponent },
     
      { path: '', redirectTo: '/dashboard/users', pathMatch: 'full' } // Default child route
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
