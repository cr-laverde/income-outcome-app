import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  user!: User | null;
  userSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter( ({user}) => user !== null )
      )
      .subscribe( ({user}) => this.user =  user );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout()
      .then( () => {
        this.route.navigate(['/login']);
      });
  }

}
