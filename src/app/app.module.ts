import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Modules
import { AppRoutingModule } from './app-routing.module';


import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { EnrollComponent } from './auth/enroll/enroll.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeOutcomeComponent } from './income-outcome/income-outcome.component';
import { StatisticsComponent } from './income-outcome/statistics/statistics.component';
import { DetailComponent } from './income-outcome/detail/detail.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EnrollComponent,
    DashboardComponent,
    IncomeOutcomeComponent,
    StatisticsComponent,
    DetailComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
