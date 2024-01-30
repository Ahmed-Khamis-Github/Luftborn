import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  form: FormGroup;
  data :any
  isEmployee :any
  isCompany :any


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router ,
    private dataService:DataService ,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
       email: ['', [Validators.required, Validators.email]],
      });
    }


    selectedAccountType: string = 'company';


    submit(): void {
      if (this.form.valid) {
        if (this.selectedAccountType === 'employee') {
          this.dataService.ForgetPassEmployee(this.form.value)
            .subscribe(
              (res) => {
                console.log(res);
                this.data = res;
                if (this.data.status === 200) {
                  // Pass account type as a query parameter
                  this.router.navigate(['/reset-password'], {
                    queryParams: { type: 'employee' },
                  });
                  this.toastr.success(JSON.stringify(this.data.msg), JSON.stringify(this.data.status), {
                    timeOut: 2000,
                    progressBar: true,
                  });
                }
              },
              (error) => {
                // Handle error here
                this.toastr.error('Error with your credentials', '401', {
                  timeOut: 5000,
                  progressBar: true,
                });
              }
            );
        }  
      } else {
        this.toastr.error('Invalid Email', 'Invalid Form', {
          timeOut: 2000,
          progressBar: true,
        });
      }
    }
  
}



 