import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithIncome } from '../income-outcome.reducer';
import { IncomeOutcome } from 'src/app/models/income-outcome.model';

import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Incomes', 'Outcomes'];
  public doughnutChartData: MultiDataSet = [[]];

  incomes: number = 0;
  outcomes: number = 0;

  totalIncomes: number = 0;
  totalOutcomes: number = 0;

  constructor( private store: Store<AppStateWithIncome> ) { }

  ngOnInit(): void {
    this.store.select('incomeOutcome')
      .subscribe( ({ items }) => this.buildStatistics( items ) )
  }

  buildStatistics(items: IncomeOutcome[]) {
    this.totalIncomes = 0;
    this.totalOutcomes = 0;
    this.incomes = 0;
    this.outcomes = 0;

    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncomes += item.amount;
        this.incomes ++;
      } else {
        this.totalOutcomes += item.amount;
        this.outcomes ++;
      }
    }

    this.doughnutChartData = [ [ this.totalIncomes, this.totalOutcomes ] ];
  }

}
