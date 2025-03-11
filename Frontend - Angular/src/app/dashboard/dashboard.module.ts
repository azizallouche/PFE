import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { UsersComponent } from './users/users.component';


import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { JobsComponent } from './jobs/jobs.component';
import { vmModule } from '../variableMatching/vm.module';
import { AddjobComponent } from './addjob/addjob.component';
import { AddjobformComponent } from './addjobform/addjobform.component';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { JobsresultsComponent } from './jobsresults/jobsresults.component';
import { JobresultsinfoComponent } from './jobresultsinfo/jobresultsinfo.component';
import { JobdescriptionComponent } from './jobdescription/jobdescription.component';
import { AddhrComponent } from './addhr/addhr.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
@NgModule({
  declarations: [
    DashboardHomeComponent,
    UsersComponent,
    JobsComponent,
    AddjobComponent,
    AddjobformComponent,
    JobsresultsComponent,
    JobresultsinfoComponent,
    JobdescriptionComponent,
    AddhrComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PaginatorModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    vmModule,
    InputTextareaModule,
    CardModule,
    FormsModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule
   
  ]
})
export class DashboardModule { }
