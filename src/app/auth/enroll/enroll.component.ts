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
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styles: [
  ]
})
export class EnrollComponent implements OnInit, OnDestroy {

  enrollForm!: FormGroup;
  isLoading: boolean = false;
  uiSubscription!: Subscription;

  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  create() {
    if (this.enrollForm.invalid) return;

    this.store.dispatch( isLoading() );

    /* Swal.fire({
      title: 'Wait a moment',
      didOpen: () => {
        Swal.showLoading()
      }
    }); */

    const { name, email, password } = this.enrollForm.value;
    this.authService.createUser(name, email, password)
      .then( credentials =>  {
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

  checkInputValid(inputName: string): boolean {
    const inputValid = this.enrollForm.get(inputName)?.valid;
    return ( inputValid !== undefined) ? inputValid : false;
  }

}
