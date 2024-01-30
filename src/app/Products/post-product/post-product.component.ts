import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
 import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";
import { ProductService } from 'src/app/services/product.service';
//spinner
 @Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent {

  jobForm: FormGroup;
  categories: any[] = []; // Declare the 'categories' property
  userFormData : FormData


	constructor(
	  public formBuilder: FormBuilder,
	  private router: Router,
	  private ngZone: NgZone,
	  private productService: ProductService,
	  private http: HttpClient,
	  private toastr: ToastrService,

 
	) {
    this.userFormData = new FormData(); // Initialize userFormData here

 	  this.jobForm = this.formBuilder.group({

		name: ['', [Validators.required , Validators.minLength(2)]],
 		category_id: ['' , Validators.required],
 		compare: ['' , ],
		price: [''],
		description: ['' , Validators.required],
 	  });
	}

  onSubmit() {
    const formData = new FormData();

    this.userFormData.append('name',this.jobForm.get('name').value)
     this.userFormData.append('category_id',this.jobForm.get('category_id').value)
     this.userFormData.append('compare',this.jobForm.get('compare').value)
    this.userFormData.append('price',this.jobForm.get('price').value)
    this.userFormData.append('description',this.jobForm.get('description').value)
    console.log(this.userFormData)
 
    if(this.jobForm.valid) {


      this.productService.addJob(this.userFormData).subscribe((res) => {
		console.log(this.userFormData);
        console.log('added successfully');

            if (res.status === 200) {
              this.router.navigate(["/company/dashboard/jobs"]);
              this.toastr.success(
                JSON.stringify("added successfully"),
                JSON.stringify(res.status),
                {
                  timeOut: 2000,
                  progressBar: true,
                }
              );
            }

          (error) => {
            // Handle error here
            this.toastr.error("Error with your credentials", "401", {
              timeOut: 5000,
              progressBar: true,
            });
          }

      },
	  (err) => {
		this.toastr.error('error with data entered.', '403', {
		  timeOut: 5000,
		  progressBar: true,
		  positionClass: 'toast-top-full-width'

		});
	  }

	  );
    }
    else{
      this.toastr.error(
        JSON.stringify("invalid data"),
        JSON.stringify(403),
        {
          timeOut: 2000,
          progressBar: true,
        }
      );

	  }
	}

	ngOnInit() {
 	}

	 
	 
}

