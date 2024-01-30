// product.service.ts

 import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  constructor(private http: HttpClient) {}
  jobApi:string = 'http://localhost:8000/api/products';

  getHeaders() {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }

  getProducts(): Observable<any> { 
    const apiUrl = `http://localhost:8000/api/products`;
    return this.http.get(apiUrl, { headers: this.getHeaders() });
  }

  addJob(data:any):Observable<any>{
    let APIUrl = this.jobApi;
    return this.http.post(APIUrl,data,{
			headers: this.getHeaders(),
		}
    ).pipe(catchError(this.handelError));
  }

  handelError(error:HttpErrorResponse){
    let errMsg = '';
    if(error.error instanceof ErrorEvent){
      errMsg = error.error.message;
    }else{
      errMsg = `Error Code :  ${error.status}`;
    }
    return throwError(errMsg); 
  }

  updateJob(id:any , data:any):Observable<any>{
    let APIUrl = `${this.jobApi}/${id}`;
    return this.http.put(APIUrl,data,{
			headers: this.getHeaders(),
		})
    .pipe(map(
      (res:any)=>{
        return res || {};
      } 
      ),
      catchError(this.handelError)
      );
  }
}
