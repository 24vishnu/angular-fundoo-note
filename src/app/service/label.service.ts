import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private baseUrl = environment.apiBaseUrl;
  private listLabelUrl = environment.apiLabelsUrl;
  private lableDetailsUrl = environment.apiDetailLabelUrl;

  constructor(private http: HttpClient) { }

  getLabels(token): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.listLabelUrl,
     {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }

  addLabel(data, token): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.listLabelUrl, data,
      {
       headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
     });
  }
  deleteLabel(labelId, token): Observable<any> {
    return this.http.delete<any>(this.baseUrl + this.lableDetailsUrl + labelId,
      {
       headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
     });
  }

  updateLabel(data, labelId, token): Observable<any> {
    return this.http.put<any>(this.baseUrl + this.lableDetailsUrl + labelId, data,
      {
       headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
     });
  }
}
