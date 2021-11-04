import { createAction, props } from '@ngrx/store';
import { IncomeOutcome } from '../models/income-outcome.model';

export const setItems = createAction(
    '[IncomeOutcome] Set Items',
    props<{ items: IncomeOutcome[] }>()
);

export const unSetItems = createAction('[IncomeOutcome] Unset items');