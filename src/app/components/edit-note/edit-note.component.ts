import { Component, OnInit, Optional,
  Inject, OnChanges, AfterContentInit,
  OnDestroy} from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { Note} from 'src/app/models/note';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
  providers: [DatePipe]
})
export class EditNoteComponent implements OnInit, AfterContentInit, OnDestroy {
  token = localStorage.getItem('token');
  public noteStyle;
  public editNote: Note;
  public newData = {};

  ngOnDestroy() {
    this.closeDialog();
  }
  ngAfterContentInit() {
    this.noteStyle = {
      'background-color': this.editNote.change_color
    };
  }

  constructor(
      // private noteService: NoteServiceService,
      private snackBar: MatSnackBar,
      private dataservice: DataService,
      private datePipe: DatePipe,
      @Optional() public dialogRef: MatDialogRef<EditNoteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Note
      ) { }

  ngOnInit() {
    this.editNote = this.data;
  }

  showHideButton() {
    this.newData = {
      title: this.editNote.title,
      content: this.editNote.content
    };
    this.closeDialog();
  }


editedTime() {
  return this.datePipe.transform(new Date(Date.now()).toJSON(), 'd MMM hh:mm a  ');
  }

  closeDialog() {
    this.dialogRef.close(this.newData);
  }

}
