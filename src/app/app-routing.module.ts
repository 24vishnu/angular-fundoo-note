import { NgModule } from '@angular/core';
import { Route, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ViewnoteComponent } from './components/viewnote/viewnote.component';
import { EditLabelComponent } from './components/edit-label/edit-label.component';


const routes: Route[] = [

  // {path: '', component: ViewnoteComponent},
  {path: 'addnote', component: AddnoteComponent},
  {path: 'signup', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  {path:'', redirectTo:'/dashboard', pathMatch: 'full'}
  // {path:'', component: EditLabelComponent}
  // {path:'**', redirectTo:'/signup', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
