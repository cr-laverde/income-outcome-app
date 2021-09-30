import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EnrollComponent } from "./auth/enroll/enroll.component";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'enroll', component: EnrollComponent },
    { 
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes,
        canActivate: [ AuthGuard ]
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}