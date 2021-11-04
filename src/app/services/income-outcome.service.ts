import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { IncomeOutcome } from '../models/income-outcome.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeOutcomeService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  createIncomeOutcome(incomeOutcome: IncomeOutcome) {
    const uid = this.authService.userAuth?.uid;

    delete incomeOutcome.uid; // used to delete a property of an object
    return this.firestore.doc(`${uid}/income-outcome`)
      .collection('items')
      .add({ ...incomeOutcome });
  }

  initIncomeOutcomeListener( uid: string ) {
    return this.firestore.collection(`${uid}/income-outcome/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => 
          snapshot.map( doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
            })
          )
        )
      );
  }

  deleteIncomeOutcome( uidItem: string | undefined) {
    const uid = this.authService.userAuth?.uid;
    return this.firestore.doc(`${uid}/income-outcome/items/${uidItem}`).delete();
  }
}
