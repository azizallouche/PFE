import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { vmComponent } from './vm.component';
import {QAComponent} from "./qa/qa.component";

const routes: Routes = [{ path: '', component: vmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class vmRoutingModule { }
