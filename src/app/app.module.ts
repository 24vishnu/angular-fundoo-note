import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCardModule, MatSnackBarModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { UserService } from './service/user.service';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditLabelComponent } from './components/edit-label/edit-label.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    EditLabelComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    OverlayModule,
    MatSnackBarModule,
    FlexLayoutModule,  
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
