import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  private baseUrl = environment.apiBaseUrl;
  private addNoteUrl = environment.apiNoteUrl;
  private modifyUrl: "note/";


  constructor(private http: HttpClient) { }

  addNote(note_data, user_token){
    console.log(user_token)
    return this.http.post<any>(this.baseUrl + this.addNoteUrl, note_data, {
      headers: new HttpHeaders().append('Authorization', 'Bearer '+ user_token)
    });
  }

  getNotes( token): Observable<any> {
    console.log(token)
    return this.http.get<any>(this.baseUrl + this.addNoteUrl,
     {
      headers: new HttpHeaders().append('Authorization', 'Bearer '+token)
    });
  }
  
  updateNote(modify_data, token){
    return this.http.put(this.baseUrl + this.modifyUrl, modify_data, token);
  }
}
