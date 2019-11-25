import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/';
  private loginUrl = 'sessionlogin/';
  private forgotPasswordUrl = 'forgotpassword/';
  private resetPassword = 'resetpassword/';
  private signupUrl = 'signup/'

  constructor(private http: HttpClient) { }

  registerUser(user){
    return this.http.post<any>(this.baseUrl + this.signupUrl, user);
  }
  
  loginUser(user): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.loginUrl, user);
  }
  forgotPasswordUser(user): Observable<any>{
    console.log(user);
    console.log("Forgot : "+this.baseUrl + this.forgotPasswordUrl)
    return this.http.post<any>(this.baseUrl + this.forgotPasswordUrl, user);
  }
  setPasswordUser(user, token): Observable<any>{
    console.log(user);
    console.log(token);
    return this.http.post<any>(this.baseUrl + this.resetPassword, user, token);
  }
}
