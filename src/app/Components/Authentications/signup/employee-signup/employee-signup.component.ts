import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-employee-signup',
  templateUrl: './employee-signup.component.html',
  styleUrls: ['./employee-signup.component.scss']
})
export class EmployeeSignupComponent {
  form: FormGroup;
  data : any

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router ,
    private dataService:DataService ,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
       name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator // Custom validator function
    });

    const isAuth = this.canActivate();

		if (isAuth) {
			// User is not authenticated, you can proceed with other actions or leave this empty.
		} else {
			// User is authenticated, redirect to the home page
			this.router.navigate(["/"]);
		}
  }

  // Custom validator function to check if password and password confirmation match
  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');

    if (password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  };



  submit(): void {
    if (this.form.valid) {
      this.dataService.SignupUser(this.form.value)
        .pipe(
          catchError((error) => {
            if (error.status === 422 && error.error.msg === 'Validation Errors' && error.error.data.includes('The email has already been taken.')) {
              this.toastr.error('The email has already been taken.', 'Error', {
                timeOut: 2000,
                progressBar: true,
              });
            } else {
              this.toastr.error('An error occurred while signing up.', 'Error', {
                timeOut: 2000,
                progressBar: true,
              });
            }
            return throwError(error); // Re-throw the error to propagate it further if needed
          })
        )
        .subscribe((res) => {
          this.data = res;
          if (this.data.status === 201) {
            this.toastr.success(JSON.stringify(this.data.msg), JSON.stringify(this.data.status), {
              timeOut: 2000,
              progressBar: true,
            });

            this.router.navigate(['/login'])
          }
        });
    }
  }

  canActivate(): boolean {
		const check = localStorage.getItem("token");
		if (check) {
			// User is authenticated, so redirect to the home page
			this.router.navigate(["/"]);
			return false; // Prevent access to the route
		} else {
			return true; // User is not authenticated, allow access to the route
		}
	}

}