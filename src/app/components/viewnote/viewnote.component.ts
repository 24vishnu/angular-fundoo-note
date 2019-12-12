import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatDialog } from '@angular/material';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.scss']
})
export class ViewnoteComponent implements OnInit, AfterViewInit {
  private updatedData;
  private token = localStorage.getItem('token');
  private getNote: any;
  gridListView = false;
  @Input() viewListGrid: boolean;


  constructor(
    private noteService: NoteServiceService,
    public dialog: MatDialog,
    private dataservice: DataService
     ) {
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.getNote, event.previousIndex, event.currentIndex);
  }
   ngAfterViewInit() {
    console.log('in View coponent after init: ', this.getNote);
   }

  ngOnInit() {
    this.dataservice.currentMessage.subscribe(notes => this.getNote = notes);
    console.log('in View coponent init: ', this.getNote);
  }

  moveTrash(noteId) {
    console.log(noteId);
    const newDetails = {
      is_trashed: true
    };
    this.noteService.updateNote(newDetails, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.updatedData = result;

        this.getNote =  this.getNote.filter(note => note.note.id !== noteId);
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
    const newDetails = {
      is_archive: true
    };
    this.noteService.updateNote(newDetails, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.updatedData = result;

        this.getNote =  this.getNote.filter(note => note.note.id !== noteId);
      },
      err => console.log('failed to load api' + err)
    );
  }

  changeColor(noteId, color) {
    const newDetails = {
      change_color: color
    };
    console.log(color);
    this.noteService.updateNote(newDetails, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.updatedData = result;
        console.log(this.updatedData);
        for (const note of this.getNote) {
          if (note.note.id === noteId) {
            note.note = this.updatedData.data;
          }
        }
        // console.log('after check : ',this.getNote)
        // this.dataservice.changeMessage(this.getNote)
      },
      err => console.log('failed to load api' + err)
    );
  }
  openDialog(note) {
    const dialogRef = this.dialog.open(EditNoteComponent,
      {
        height: 'auto',
        width: '50%',
        data: note,
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.updateNote(note.id);
      console.log(`The dialog was closed and result is ${(result)}`);
    });
  }



  updateNote(noteId) {
    const newDetails = {
      title: true,
      content: true
    };
    this.noteService.updateNote(newDetails, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.updatedData = result;
      },
      err => console.log('failed to load api' + err)
    );
  }
}

