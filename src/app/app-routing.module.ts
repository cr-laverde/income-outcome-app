import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EnrollComponent } from "./auth/enroll/enroll.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'enroll', component: EnrollComponent },
    {
        path: '',
        //canActivate: [ AuthGuard ],
        canLoad: [ AuthGuard ],
        loadChildren: () => import('./income-outcome/income-outcome.module').then( m => m.IncomeOutcomeModule )
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