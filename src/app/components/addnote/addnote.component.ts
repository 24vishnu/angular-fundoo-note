import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {
  private showNoteContent = true;
  private noteData: Note = new Note();
  private allNotes: Note[];
  private title = new FormControl('');
  private content = new FormControl('');
  private token: string;

  constructor(
    private noteService: NoteServiceService,
    private snackBar: MatSnackBar,
    private dataservice: DataService
  ) { }

  /*
    A callback method that is invoked immediately after the default change
    detector has checked the directive's data-bound properties for the first
    time, and before any of the view or content children have been checked.
    It is invoked only once when the directive is instantiated.
  */
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.dataservice.currentMessage.subscribe(notes => this.allNotes = notes);
  }

  showHideButton() {
    this.showNoteContent = this.showNoteContent ? false : true;

    if (this.showNoteContent) {
      this.noteData.title = this.title.value;
      this.noteData.content = this.content.value;
      // show data on console
      console.log(this.noteData);
      // if user enter note title or note description then add note
      if (this.noteData.title != null || this.noteData.content != null) {
        // post data on backend api
        this.noteService.addNote(this.noteData, this.token).subscribe(
          result => {
            this.snackBar.open('Note successfully added', 'close')
              ._dismissAfter(2500);
            // print the result on console
            console.log(result);
            this.allNotes.push(result.data);
            this.dataservice.changeMessage(this.allNotes);
            console.log('After update data is :', this.allNotes);
          },
          err => {
            // print if error occur during add note data  in database
            console.log(err);
            this.snackBar.open('Error: your data not storing in database')._dismissAfter(2500);
          }
        );
        /*
          Resets the form control, marking it pristine and untouched, and setting the value to null.
        */
        this.title.setValue('');
        this.content.setValue('');
      }
    }
  }
}
