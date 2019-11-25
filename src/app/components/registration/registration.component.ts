import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  // Login = 'login';
  // Registration = 'signup'

  registerUserData = {};
  hide = 'true';
  hide1 = 'true';
  password;
  cpassword;
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cpassword: new FormControl('', [Validators.required, Validators.minLength(6), this.passwordMatcher.bind(this)])
  }
  );

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.registerUserData)
    this.userService.registerUser(this.registerUserData).subscribe(
      res => {
        this.snackBar.open('registration success', 'close', {
          duration: 2000
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.snackBar.open('registration failed', 'close', {
          duration: 2000
        });
        console.log(err);
      });

    console.log(this.registerUserData);
  }
  // confirm new password validator
  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.form &&
      (control.value !== this.form.controls.password.value)
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

}
