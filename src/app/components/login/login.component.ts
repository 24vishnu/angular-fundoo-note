import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {};
  hide = 'true';
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    console.log('this is login data : ', this.loginUserData);
    this.userService.loginUser(this.loginUserData)
      .subscribe(
        response => {
          this.snackBar.open('login success', 'close', {
            duration: 2000
          });
          // console.log("This is response : ",response)
          localStorage.setItem('token', response.data.access);
          this.router.navigate(['/dashboard']);
        },
        err => this.snackBar.open('login failed', 'close', {
          duration: 2000
        }));
  }
}
