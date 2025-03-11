import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
// Import HomeComponent
import { AuthGuard } from './auth.guard';
import { RedirectComponentComponent } from './redirect-component/redirect-component.component';

const routes: Routes = [
   {path: 'home',loadChildren:()=> import('./layouts/layouts.module').then( m=> m.LayoutsModule) , canActivate: [AuthGuard]},
   { path: 'auth', component: AuthComponent , canActivate: [AuthGuard]  },
   { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: '',  component: RedirectComponentComponent },
  { path: '**',  component: RedirectComponentComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
