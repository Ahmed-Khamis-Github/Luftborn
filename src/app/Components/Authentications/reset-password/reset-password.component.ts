import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form: FormGroup;
  data : any

  @Input() isEmployee: boolean;
  @Input() isCompany: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router ,
    private dataService:DataService ,
    private toastr: ToastrService,
    private route: ActivatedRoute

  ) {}


  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      const accountType = params['type'];
      if (accountType === 'employee') {
        this.isEmployee = true;
      } else if (accountType === 'company') {
        this.isCompany = true;
      }
    });


    this.form = this.formBuilder.group({
       email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
       otp: ['', [Validators.required, Validators.minLength(3)]],

     } )
  }

    

  submit(): void {
    if (this.form.valid) {
      if (this.isEmployee === true) {
        this.dataService.EmployeeResetPassword(this.form.value)
          .subscribe(
            (res) => {
              this.data = res;
              if (this.data.status === 200) {
                this.router.navigate(['/login']);
                this.toastr.success(JSON.stringify(this.data.msg), JSON.stringify(this.data.status), {
                  timeOut: 2000,
                  progressBar: true,
                });
              }
            },
            (error) => {
              // Handle error here
              this.toastr.error('Enter a valid OTP', '401', {
                timeOut: 5000,
                progressBar: true,
              });
            }
          );
      } 
    } else {
      this.toastr.error('Please enter valid information', 'Invalid Form', {
        timeOut: 2000,
        progressBar: true,
      });
    }
  }


}
