import { Component, OnInit, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';
import { MatChipInputEvent } from '@angular/material/chips';
import { CollaborateComponent } from '../collaborate/collaborate.component';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.scss']
})
export class ViewnoteComponent implements OnInit {
  private updatedData: Note = new Note();
  private token: string;
  private getNote: Note[];

  gridListView = false;
  @Input() viewListGrid: boolean;


  constructor(
    private noteService: NoteServiceService,
    public dialog: MatDialog,
    private dataservice: DataService,
    private snackBar: MatSnackBar
     ) {
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.dataservice.currentMessage.subscribe(notes => this.getNote = notes);
    console.log('in View coponent init: ', this.getNote);
  }

  removeLable(lable) {
    // remove label form note and update note with updated labels
    console.log('remove this label', lable);
  }
  moveTrash(noteId) {
    console.log(noteId);
    const noteDetail: Note = new Note();
    noteDetail.is_trashed = true;
    this.noteService.updateNote(noteDetail, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.updatedData = result.data;

        this.getNote =  this.getNote.filter(note => note.id !== noteId);
      },
      err => console.log('failed to load api' + err)
    );
  }

  chageList() {
    if (this.viewListGrid) {
    const style = {
      width: '100%',
      'flex-direction': 'column'
    };
    return style;
  }
  }
  noteColor(color) {
      const style = {
        'background-color': color
      };
      return style;
  }

  archiveNote(noteId) {
    const noteDetail: Note = new Note();
    noteDetail.is_archive = true;
    this.noteService.updateNote(noteDetail, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.updatedData = result;

        this.getNote =  this.getNote.filter(note => note.id !== noteId);
      },
      err => console.log('failed to load api' + err)
    );
  }

  changeColor(noteId, color) {
    const noteDetail: Note = new Note();
    noteDetail.change_color = color;
    console.log(color);
    this.noteService.updateNote(noteDetail, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.updatedData = result.data;
        console.log(this.updatedData);
        this.getNote =  this.getNote.filter(note => note.id !== noteId);
        this.getNote.push(this.updatedData);
      },
      err => {
        console.log('failed to load api' + err);
        alert('failed to load api');
    }
    );
  }
  openDialog(note) {
    const dialogRef = this.dialog.open(EditNoteComponent,
      {
        panelClass: 'edit-note-no-padding-dialog',
        height: 'auto',
        width: '50%',
        data: note,
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (Object.getOwnPropertyNames(result).length > 0) {
          this.updateNote(result, note.id);
      }
      console.log('The dialog has been closed and result is ', result);
    });
  }

  openCollaborateDialog(note) {
    const dialogRef = this.dialog.open(CollaborateComponent,
      {
        data: note,
      }
    );
    dialogRef.afterClosed().subscribe(result => {

      if ( result !== undefined) {
        if (note.collaborate.length !== result.length) {
          this.updateNote({collaborate: result}, note.id);
        }
      }
      console.log('Dialog box closed and result is ', result);
    },
    err => {
      console.log('Some thing is wrong: ', err);
    });
  }



  updateNote(collaborateList: any, noteId) {
    console.log(collaborateList);

    this.noteService.updateNote(collaborateList, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.snackBar.open('data successfully update.')._dismissAfter(2000);
        this.getNote =  this.getNote.filter(updatedNote => updatedNote.id !== noteId);
        this.getNote.push(result.data);
        console.log(this.getNote, collaborateList);
        // this.dataservice.
      },
      err => {
        // console.log(err.error.s);
        if ( err.status === 404) {
          console.log('This email does not exist in database!');
          // this.matSnackBar.open('label successfully added.', 'close')
          this.snackBar.open('email does not exist.', 'close')._dismissAfter(3000);
        } else {
         console.log('failed to update: ', err);
        }
      }
    );
  }
}

