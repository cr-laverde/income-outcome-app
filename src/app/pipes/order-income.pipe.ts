import { Pipe, PipeTransform } from '@angular/core';
import { IncomeOutcome } from '../models/income-outcome.model';

@Pipe({
  name: 'orderIncome'
})
export class OrderIncomePipe implements PipeTransform {

  transform(items: IncomeOutcome[]): IncomeOutcome[] {

    //becasuse in strict mode has to be copied the object can´t be update directly
    return items.slice().sort( (a,b) => ( a.type === 'income' ) ? -1 : 1 );
    
  }

}
