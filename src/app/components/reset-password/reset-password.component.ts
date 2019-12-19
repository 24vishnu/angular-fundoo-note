import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userData = {};
  passToken = {
    token: ''
  };
  token;

  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(6), this.passwordMatcher.bind(this)])
  });

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router
    ) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.url[1].path;
  }

  setPassword() {
    this.passToken.token = this.token;
    this.userService.setPasswordUser(this.userData, this.passToken).subscribe(
      res => {
        this.router.navigate(['/login']);
        this.snackBar.open('set password success', 'close', {
        duration: 2000
      });
    },
      err => this.snackBar.open('set password failed', 'close', {
        duration: 2000
      })
    );
  }

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
