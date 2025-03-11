import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { LayoutsModule } from './layouts/layouts.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

import { SidebarModule } from 'primeng/sidebar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RedirectComponentComponent } from './redirect-component/redirect-component.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    RedirectComponentComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    PaginatorModule,
    InputTextModule,
    FloatLabelModule,
    InputGroupModule,
    TableModule,
    InputGroupAddonModule,
    LayoutsModule,
    DashboardModule,
    
    BrowserAnimationsModule,
   
    SidebarModule,
    ButtonModule
    
    

  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
