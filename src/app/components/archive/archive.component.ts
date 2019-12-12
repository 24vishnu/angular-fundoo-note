import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  private archiveNotes;
  private updateData;

  constructor(private noteservice: NoteServiceService) { }

  ngOnInit() {
    // console.log('Archive ngOnInit Called....')
    this.noteservice.getArchiveNotes(localStorage.getItem('token')).subscribe(
      response => {
        this.archiveNotes = response.data;
        console.log('response: ', this.archiveNotes);
      },
      err => {
        this.archiveNotes = null;
        console.log('error: ', err);
      }
    );
  }

  moveInTrash(noteId) {
    const newDetails = {
        is_trashed: true
      };
    this.noteservice.updateNote(newDetails, noteId, localStorage.getItem('token')).subscribe(
        result => {
          console.log('This note is updated just now: -> ', result);
          this.updateData = result;
        },
        err => console.log('failed to load api' + err)
      );
  }
  unArchive(noteId) {
    const newDetails = {
      is_archive: false
    };
    this.noteservice.updateNote(newDetails, noteId, localStorage.getItem('token')).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.updateData = result;
      },
      err => console.log('failed to load api' + err)
    );
}
}
