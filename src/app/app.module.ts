import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/includes/header/header.component';
import { FooterComponent } from './Components/includes/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';



import { AuthGuard } from './Guards/auth.guard';
import { Error404Component } from './Components/ErrorComponents/error404/error404.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
 
 import { JobsComponent } from './Components/Home/jobs/jobs.component';
 import { IndexComponent } from './Components/Home/index/index.component';
import { EmployeeSignupComponent } from './Components/Authentications/signup/employee-signup/employee-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/Authentications/login/login.component';
import { ForgetPasswordComponent } from './Components/Authentications/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/Authentications/reset-password/reset-password.component';
import { ManageProductsComponent } from './Products/manage-products/manage-products.component';
import { PostProductComponent } from './Products/post-product/post-product.component';
import { EditProductComponent } from './Products/edit-product/edit-product.component';
 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
     

    Error404Component,
    ContactUsComponent,
     JobsComponent,
     IndexComponent,
    EmployeeSignupComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ManageProductsComponent,
    PostProductComponent,
    EditProductComponent,
 
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, ToastrModule, ToastrModule.forRoot(), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
