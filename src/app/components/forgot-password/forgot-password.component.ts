import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  EmailData = {};
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])

  });
  constructor(private userService: UserService, private snackBar: MatSnackBar,  private router: Router) { }

  ngOnInit() {
  }

  send() {
    console.log(this.EmailData);
    this.userService.forgotPasswordUser(this.EmailData).subscribe(
      res => this.snackBar.open('mail has been send for setting new password', 'close', {
        duration: 2000
      }),
      err => this.snackBar.open('failed to send email', 'close', {
        duration: 2000
      }));

  }

}