import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  isLoading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ] ],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
        this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(isLoading());

    /* Swal.fire({
      title: 'Wait a moment',
      didOpen: () => {
        Swal.showLoading()
      }
    }); */


    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .then( credentials => {
        //Swal.close();
        this.store.dispatch( stopLoading() );
        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch( stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          //footer: '<a href="">Why do I have this issue?</a>'
        })
      });
    
  }

}
