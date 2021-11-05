import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IncomeOutcome } from '../models/income-outcome.model';
import { setItems, unSetItems } from './income-outcome.actions';

export interface State {
    items: IncomeOutcome[]; 
}

export interface AppStateWithIncome extends AppState { // se usa cuando se carga un reducer con lazyload
    incomeOutcome: State
}

export const initialState: State = {
   items: [],
}

const _incomeOutcomeReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items]})),
    on(unSetItems, state => ({ ...state, items: []})),

);

export function incomeOutcomeReducer(state: State | undefined, action: Action) {
    return _incomeOutcomeReducer(state, action);
}