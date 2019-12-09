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
  private noteDetailUrl= environment.apiDeleteUrl;
  private archiveUrl = environment.apiArchiveUrl;
  private trashedUrl = environment.apiTrashedUrl;
  private reminderUrl = environment.apiReminderUrl;
  private labelsNoteUrl = environment.apiLabelsNoteUrl;


  constructor(private http: HttpClient) { }

  addNote(note_data, user_token){
    console.log(user_token)
    return this.http.post<any>(this.baseUrl + this.addNoteUrl, note_data, {
      headers: new HttpHeaders().append('Authorization', 'Bearer '+ user_token)
    });
  }
  getOneNote(note_id, token): Observable<any> {
    return this.http.get<any>(this.baseUrl+this.noteDetailUrl + note_id, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }
  getNotes( token): Observable<any> {

    return this.http.get<any>(this.baseUrl + this.addNoteUrl,
     {
      headers: new HttpHeaders().append('Authorization', 'Bearer '+token)
    });
  }
  
  updateNote(modifed_data, note_id, token){
    // console.log('update note service called',modifed_data, note_id);
    return this.http.put(this.baseUrl + this.noteDetailUrl + note_id, modifed_data, {
      headers: new HttpHeaders().append('Authorization', 'Bearer '+token)
    });
  }

  getArchiveNotes(token):Observable<any>{
    return this.http.get<any>(this.baseUrl+this.archiveUrl, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }
  getTrashedNotes(token):Observable<any>{
    return this.http.get<any>(this.baseUrl+this.trashedUrl, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }

  deleteNote(note_id, token): Observable<any>{
    return this.http.delete<any>(this.baseUrl+this.noteDetailUrl + note_id, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }

  getReminderNotes(token):Observable<any>{
    return this.http.get<any>(this.baseUrl+this.reminderUrl, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }

  getLabelsNote(lable_id, token){
    return this.http.get<any>(this.baseUrl + this.labelsNoteUrl + lable_id, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }
}
