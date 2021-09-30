import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styles: [
  ]
})
export class EnrollComponent implements OnInit {

  enrollForm!: FormGroup;

  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required],
    });
  }

  create() {
    if (this.enrollForm.invalid) return;

    Swal.fire({
      title: 'Wait a moment',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const { name, email, password } = this.enrollForm.value;
    this.authService.createUser(name, email, password)
      .then( credentials =>  {
        console.log(credentials);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch( err => {
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
