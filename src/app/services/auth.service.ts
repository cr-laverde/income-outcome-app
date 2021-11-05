import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as authActions from '../auth/auth.actions';
import * as incomeoutcomeActions from '../income-outcome/income-outcome.actions';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _userAuth!: User | null;

  get userAuth() {
    return this._userAuth;
    //return {... this._userAuth};
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store,
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe( fireUser => {
      if (fireUser) {
        this.userSubscription = this.firestore.doc(`${ fireUser.uid }/usuario`)
          .valueChanges()
          .subscribe( (fireStoreUser: any) =>  {
            const user = User.fromFirebae(fireStoreUser);
            this._userAuth = user;
            this.store.dispatch( authActions.setUser({ user }) );
          });
      } else {
        this._userAuth = null;
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch( authActions.unSetUser() );
        this.store.dispatch( incomeoutcomeActions.unSetItems() );
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({ user }) => {
        const newUser = new User( user!.uid, name, email );
        return this.firestore.doc(`${user?.uid}/usuario`)
          .set({ ...newUser });
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    )
  }
}
