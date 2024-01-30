import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
     import { IndexComponent } from './Components/Home/index/index.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { Error404Component } from './Components/ErrorComponents/error404/error404.component';
 
//dashboard
  import { EmployeeSignupComponent } from './Components/Authentications/signup/employee-signup/employee-signup.component';
 import { LoginComponent } from './Components/Authentications/login/login.component';
import { AuthGuard } from './Guards/auth.guard';
import { ForgetPasswordComponent } from './Components/Authentications/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/Authentications/reset-password/reset-password.component';
import { ManageProductsComponent } from './Products/manage-products/manage-products.component';
import { PostProductComponent } from './Products/post-product/post-product.component';
 

const routes: Routes = [
  {
    path: '',
		component: IndexComponent
	
  },

  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'error404',
    component: Error404Component
  },
  
  {
    path: 'register',
    component: EmployeeSignupComponent,
  },
  

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },

  {
    path: 'reset-password',
    component: ResetPasswordComponent ,
  },
  {
    path: 'manage-products',
    component: ManageProductsComponent ,
  },

  {
    path: 'post-products',
    component: PostProductComponent ,
  },
  {
    path: 'edit-products',
    component: PostProductComponent ,
  },

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
