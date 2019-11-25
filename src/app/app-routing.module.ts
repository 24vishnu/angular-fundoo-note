import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Route[] = [
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path: 'signup', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent, 
  // children: [
  //   {path: '**', component: ResetPasswordComponent},
  // ]  
  },
  // {path:'**', redirectTo:'/signup', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
