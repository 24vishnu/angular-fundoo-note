import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private baseUrl = 'http://127.0.0.1:8000/';
  private getlabelUrl = 'api/labels/';
  constructor(private http: HttpClient) { }
  getLabels(token): Observable<any> {
    return this.http.put<any>(this.baseUrl + this.getlabelUrl, null, {
      headers: new HttpHeaders().append('userId', token)
    });
  }
}
