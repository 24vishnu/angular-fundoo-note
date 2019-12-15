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
  private noteDetailUrl = environment.apiDeleteUrl;
  private archiveUrl = environment.apiArchiveUrl;
  private trashedUrl = environment.apiTrashedUrl;
  private reminderUrl = environment.apiReminderUrl;
  private labelsNoteUrl = environment.apiLabelsNoteUrl;


  constructor(private http: HttpClient) { }

  addNote(noteData, userToken) {
    console.log(userToken);
    return this.http.post<any>(this.baseUrl + this.addNoteUrl, noteData, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + userToken)
    });
  }
  getOneNote(noteId, token): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.noteDetailUrl + noteId, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }
  getNotes( token): Observable<any> {

    return this.http.get<any>(this.baseUrl + this.addNoteUrl,
     {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }

  updateNote(modifedData, noteId, token): Observable<any> {
    // console.log('update note service called',modifedData, noteId);
    return this.http.put(this.baseUrl + this.noteDetailUrl + noteId, modifedData, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }

  getArchiveNotes(token): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.archiveUrl, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }
  getTrashedNotes(token): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.trashedUrl, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }

  deleteNote(noteId, token): Observable<any> {
    return this.http.delete<any>(this.baseUrl + this.noteDetailUrl + noteId, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }

  getReminderNotes(token): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.reminderUrl, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }

  getLabelsNote(lableId, token) {
    return this.http.get<any>(this.baseUrl + this.labelsNoteUrl + lableId, {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token)
    });
  }
}
