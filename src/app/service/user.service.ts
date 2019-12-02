import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiBaseUrl;
  private loginUrl = environment.apiLoginUrl;
  private forgotPasswordUrl = environment.apiForgotPassUrl;
  private resetPassword = environment.apiResetPassUrl;
  private signupUrl = environment.apiRegisterUrl;
  private picUrl = environment.apiUserPicUrl;

  constructor(private http: HttpClient) { }

  registerUser(user){
    return this.http.post<any>(this.baseUrl + this.signupUrl, user);
  }
  
  loginUser(user): Observable<any> {
    console.log("in userlogin service :", user, (this.baseUrl + this.loginUrl))
    return this.http.post<any>(this.baseUrl + this.loginUrl, user);
  }
  forgotPasswordUser(user): Observable<any>{
    console.log(user);
    console.log("Forgot : "+this.baseUrl + this.forgotPasswordUrl)
    return this.http.post<any>(this.baseUrl + this.forgotPasswordUrl, user);
  }
  setPasswordUser(user, token): Observable<any>{
    console.log(token['token']);
    return this.http.post<any>(this.baseUrl + this.resetPassword + token['token'], user, token);
  }

  getProfilePic(token){
    return this.http.get<any>(this.baseUrl + this.picUrl,
      {
       headers: new HttpHeaders().append('Authorization', 'Bearer '+token)
     });
  }
}
