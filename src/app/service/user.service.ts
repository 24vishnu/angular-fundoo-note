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
  private picUpdateUrl = environment.apiUpdatePicUrl;
  private allUserUrl = environment.apiAllUserUrl;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this.baseUrl + this.signupUrl, user);
  }

  loginUser(user): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.loginUrl, user);
  }
  forgotPasswordUser(user): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.forgotPasswordUrl, user);
  }
  setPasswordUser(user, token): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.resetPassword + token.token, user, token);
  }

  getProfilePic(token) {
    return this.http.get<any>(this.baseUrl + this.picUrl,
      {
       headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
     });
  }
  setProfilePic(newImage, token) {
    return this.http.put<any>(this.baseUrl + this.picUpdateUrl, newImage, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }

  getCollaborators(token) {
    return this.http.get<any>(this.baseUrl + this.allUserUrl, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }
}
