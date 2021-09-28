import { Routes } from "@angular/router";
import { DetailComponent } from "../income-outcome/detail/detail.component";
import { IncomeOutcomeComponent } from "../income-outcome/income-outcome.component";
import { StatisticsComponent } from "../income-outcome/statistics/statistics.component";


export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'income-outcome', component: IncomeOutcomeComponent },
    { path: 'detail', component: DetailComponent }
];