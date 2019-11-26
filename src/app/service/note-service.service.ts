import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  private baseUrl: "http://127.0.0.1:8000/";
  private addNoteUrl: "notes/";
  private modifyUrl: "note/";


  constructor(private http: HttpClient) { }

  addNote(note_data, user_token){
    return this.http.post<any>(this.baseUrl + this.addNoteUrl, note_data, user_token);
  }

  getNotes(token){
    return this.http.get<any>(this.baseUrl + this.addNoteUrl, token);
  }
  
  updateNote(edit_data, token){
    return this.http.put(this.baseUrl + this.modifyUrl, edit_data, token);
  }
}
