import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  token = localStorage.getItem('token');
  private trashedNotes;
  private deletedNote;
  private updatedData;
  changeList = false;

  constructor(private noteservice: NoteServiceService) { }

  ngOnInit() {
    // console.log('Trash ngOnInit Called....');
    this.noteservice.getTrashedNotes(this.token).subscribe(
      response => {
        this.trashedNotes = response.data;
        console.log('trashed response: ', this.trashedNotes);
      },
      err => {
        this.trashedNotes = null;
        console.log('error: ', err);
      }
    );
  }
  setStyle() {
    const style = {
    width: this.changeList ? '100%' : 'normal',
    'flex-direction': this.changeList ? 'column' : 'row'
    };
    return style;
  }

  delete(noteId) {
    // console.log("TOKEN : -> ",localStorage.getItem('token'))
    // console.log(noteId);
    this.noteservice.deleteNote(noteId, this.token).subscribe(
      result => {
        console.log('This note is deleted: -> ', result.data);
        this.deletedNote = result.data;
      },
      err => console.log('failed to load api' + err)
    );
  }
  restoreNote(noteId) {
    const newDetails = {
      is_trashed: false
    };
    // console.log('This is new content to update: ',newDetails);
    // console.log('This is new note id: ', noteId);
    // console.log("TOKEN : -> ",localStorage.getItem('token'));

    this.noteservice.updateNote(newDetails, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.updatedData = result;
      },
      err => console.log('failed to load api' + err)
    );
  }
}
