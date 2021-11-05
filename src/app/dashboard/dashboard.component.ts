import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as incomeOutcomeActions from '../income-outcome/income-outcome.actions';
import { IncomeOutcomeService } from '../services/income-outcome.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  authSubscription!: Subscription;
  inOutcomesSubscription!: Subscription;

  constructor( 
    private store: Store<AppState>,
    private incomeOutcomeService: IncomeOutcomeService,
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.store.select('user')
      .pipe(
        filter( auth => auth.user !== null ) // retorna un booleano, si es true se ejecuta el subscribe
      )
      .subscribe( ({ user }) => {
        this.inOutcomesSubscription = this.incomeOutcomeService.initIncomeOutcomeListener( user!.uid )
          .subscribe( incomeOutcomeFB => {
            
            this.store.dispatch( incomeOutcomeActions.setItems({ items: incomeOutcomeFB }) );

          });
      });
  }

  ngOnDestroy(): void {
    this.inOutcomesSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }

}
