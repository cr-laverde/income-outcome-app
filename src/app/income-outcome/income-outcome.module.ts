import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { OrderIncomePipe } from '../pipes/order-income.pipe';
import { IncomeOutcomeComponent } from './income-outcome.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { incomeOutcomeReducer } from './income-outcome.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomeOutcomeComponent,
    StatisticsComponent,
    DetailComponent,
    OrderIncomePipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeOutcome', incomeOutcomeReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule,
  ]
})
export class IncomeOutcomeModule { }
