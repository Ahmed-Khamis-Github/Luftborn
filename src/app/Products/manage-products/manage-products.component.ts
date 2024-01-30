import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Router } from '@angular/router';
 import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  products: any[] = [];
  data :any


  constructor(private productService: ProductService ,private http: HttpClient , private router: Router ,
     private toastr: ToastrService,) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res.data;
        console.log(this.products);

      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }



  deleteProduct(productId: number) {
    const apiUrl = `http://localhost:8000/api/products/${productId}`;
    

    this.http.delete(apiUrl,{ headers: this.getHeaders() })
      .subscribe(
        (res) => {
          this.data = res;
          if (this.data.status === 200) {
             this.router.navigate(['/']);
            this.toastr.success(JSON.stringify(this.data.msg), JSON.stringify(this.data.status), {
              timeOut: 2000,
              progressBar: true,
            });
          }
        },
      );
      }


      getHeaders() {
        const token = localStorage.getItem("token");
        return new HttpHeaders({
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });
      }
    }
