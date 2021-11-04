import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IncomeOutcome } from 'src/app/models/income-outcome.model';
import { IncomeOutcomeService } from 'src/app/services/income-outcome.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  incomeOutcome: IncomeOutcome[] = [];
  inOutSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private incomeOutcomeService: IncomeOutcomeService
  ) { }

  ngOnInit(): void {
    this.inOutSubscription =  this.store.select('incomeOutcome')
      .subscribe( ({ items }) => this.incomeOutcome = items );
  }

  ngOnDestroy(): void {
    this.inOutSubscription.unsubscribe();
  }

  delete(uid: string | undefined) {
    this.incomeOutcomeService.deleteIncomeOutcome(uid)
      .then( () => Swal.fire('Delete', 'Item Delete', 'success') )
      .catch( err => Swal.fire('Error', err.message, 'error') );
  }

}
