import { Component, OnInit, Optional,
  Inject, OnChanges, AfterContentInit,
  OnDestroy, SimpleChanges, DoCheck, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { Note} from 'src/app/models/note';
import { ViewnoteComponent } from '../viewnote/viewnote.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit, AfterContentInit, OnDestroy, OnChanges {
  token = localStorage.getItem('token');
  public noteStyle;
  public editNote: Note;
  public newData: Note = new Note();
  public hour: number;
  public minuts: any;
  public message: number;

  ngOnChanges() {
    console.log(this.editNote);
  }

  ngOnDestroy() {
    this.closeDialog();
  }
  ngAfterContentInit() {
    this.noteStyle = {
      'background-color': this.editNote.change_color
    };
  }

  constructor(
      private noteService: NoteServiceService,
      private snackBar: MatSnackBar,
      private dataservice: DataService,
      @Optional() public dialogRef: MatDialogRef<EditNoteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Note
      ) { }

  ngOnInit() {
    this.editNote = this.data;
    console.log(this.editNote);
    this.startTime();
  }

  showHideButton() {
    this.newData.title = this.editNote.title;
    this.newData.content = this.editNote.content;
    this.closeDialog();
  }


startTime() {
    const today = new Date();
    this.hour = today.getHours();
    this.minuts = today.getMinutes();
    if (this.minuts < 10) {
      this.minuts = '0' + this.minuts;
    }
    const t = setTimeout(this.startTime, 500);
  }

  closeDialog() {
    console.log(this.editNote);
    this.dialogRef.close(this.newData);
  }

}
