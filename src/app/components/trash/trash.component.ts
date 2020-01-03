import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
  providers: [DatePipe]
})
export class TrashComponent implements OnInit {
  private token: string;
  private reminderData: string;
  private datetimereminder = new Date(Date.now());
  private trashedNotes;
  private deletedNote;
  private updatedData;

  @Input() viewListGrid: boolean;
  @Output() trashComponentMessage = new EventEmitter<any>();

  constructor(private noteservice: NoteServiceService,
              private dataservice: DataService,
              private datePipe: DatePipe,
              ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.dataservice.getTrashNotes();
    this.dataservice.allTrashNote.subscribe(notes => this.trashedNotes = notes);
  }

  // change view list to grid and grid to list
  changeList() {
    let style = {};
    if (this.viewListGrid) {
      style = {
        width: '100%',
        'flex-flow': 'column',
        'box-sizing': 'border-box',
        'flex-direction': 'column',
        'max-width': '100%'
      };
    } else if (window.innerWidth >= 600 && window.innerWidth < 900) {
      style = {
        'flex-flow': 'row',
        'box-sizing': 'border-box',
        'flex-direction': 'row',
        'max-width': '50%'
      };
    } else if (window.innerWidth >= 900) {
      style = {
        'flex-flow': 'row',
        'box-sizing': 'border-box',
        'flex-direction': 'row',
        'max-width': '33%'
      };
    }
    return style;
  }

    // get and set reminder
    getReminder(reminder) {
      if (reminder !== null && ((Date.parse(reminder) / 1000) - (Date.now() / 1000)) > 0) {
        this.reminderData =  this.datePipe.transform(reminder, 'd MMM hh:mm a  ');
        return true;
      }
      return false;
    }
    setReminder(note) {
      const data = {
        dataForUpdate: {reminder: this.datePipe.transform(this.datetimereminder.toISOString(), 'yyyy-MM-dd HH:mm:ss')},
        urlCridetial: note,
        showMessage: ''
      };
      this.dataservice.updateNoteDetails(data);
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
