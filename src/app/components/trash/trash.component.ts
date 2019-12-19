import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  private token: string;
  private trashedNotes;
  private deletedNote;
  private updatedData;
  changeList = false;

  constructor(private noteservice: NoteServiceService,
              private dataservice: DataService
              ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.dataservice.currentTrashNote.subscribe(notes => this.trashedNotes = notes);


    // this.noteservice.getTrashedNotes(this.token).subscribe(
    //   response => {
    //     this.trashedNotes = response.data;
    //     console.log('trashed response: ', this.trashedNotes);
    //   },
    //   err => {
    //     this.trashedNotes = null;
    //     console.log('error: ', err);
    //   }
    // );
  }
  setStyle() {
    const style = {
    width: this.changeList ? '100%' : 'normal',
    'flex-direction': this.changeList ? 'column' : 'row'
    };
    return style;
  }

  delete(noteId) {
    this.noteservice.deleteNote(noteId, this.token).subscribe(
      result => {
        console.log('This note is deleted: -> ', result.data);
        this.deletedNote = result.data;
        this.trashedNotes =  this.trashedNotes.filter(note => note.id !== noteId);
      },
      err => console.log('failed to load api' + err)
    );
  }


  restoreNote(noteId) {
    const noteDetail = {
      is_trashed: false
    };


    this.noteservice.updateNote(noteDetail, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.updatedData = result;
        this.trashedNotes =  this.trashedNotes.filter(note => note.id !== noteId);
      },
      err => console.log('failed to load api' + err)
    );
  }
}
