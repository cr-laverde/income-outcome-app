import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeOutcome } from '../models/income-outcome.model';
import { IncomeOutcomeService } from '../services/income-outcome.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as loadingAcions from '../shared/ui.actions';

@Component({
  selector: 'app-income-outcome',
  templateUrl: './income-outcome.component.html',
  styles: [
  ]
})
export class IncomeOutcomeComponent implements OnInit, OnDestroy {

  incomeOutcomeForm!: FormGroup;
  type: string = 'income';
  isLoading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private incomeOutcomeService: IncomeOutcomeService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.incomeOutcomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  save() {

    if (this.incomeOutcomeForm.invalid) return;

    this.store.dispatch( loadingAcions.isLoading() );
    
    const { description, amount } = this.incomeOutcomeForm.value;
    const incomeOutcome = new IncomeOutcome(description, amount, this.type);
    this.incomeOutcomeService.createIncomeOutcome( incomeOutcome )
    .then( () => {
      this.store.dispatch( loadingAcions.stopLoading() );
      this.incomeOutcomeForm.reset();
      Swal.fire('Saved' , description, 'success');
    })
    .catch( err => {
      this.store.dispatch( loadingAcions.stopLoading() );
      Swal.fire('Error' , err.message, 'error');
    });
  }

}
