import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.scss']
})
export class ViewnoteComponent implements OnInit {

  private token = localStorage.getItem('userIdToken');

  private getNote;

  constructor(private noteService: NoteServiceService) { }

  ngOnInit() {
    this.noteService.getNotes(this.token).subscribe(
      response => {
        console.log(response);
        this.getNote = response
      },
      err => {
        this.getNote = null;
        console.log(err);

      }
    );
  }
}
