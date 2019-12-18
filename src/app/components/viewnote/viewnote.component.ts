import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';
import { CollaborateComponent } from '../collaborate/collaborate.component';
import { Label } from 'src/app/models/label';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.scss'],
  providers: [DatePipe]
})
export class ViewnoteComponent implements OnInit {
  // public startAt = new Date(Date.now());
  private datetimereminder = new Date(Date.now());

  private updatedData: Note = new Note();
  private token: string;
  private getNote: Note[];
  private allLabels: Label[];
  private noteIdTemp: number;
  private reminderData: string;
  public gridListView = false;
  public data = {
    dataForUpdate: {},
    urlCridetial: Note
  };

  @Input() viewListGrid: boolean;

  @Output() childmessage = new EventEmitter<any>();


  constructor(
    // private noteService: NoteServiceService,
    public dialog: MatDialog,
    private dataservice: DataService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.dataservice.currentMessage.subscribe(notes => this.getNote = notes);
    this.dataservice.currentLabels.subscribe(labels => this.allLabels = labels);
  }

  setReminder(note) {
    // this.updateNoteDetails({reminder: this.datetimereminder.toJSON()}, note.id);
    const data = {
      dataForUpdate: {reminder: this.datetimereminder.toJSON()},
      urlCridetial: note
    };
    this.childmessage.emit(data);
  }
  getReminder(reminder) {
    if (reminder !== null && ((Date.parse(reminder) / 1000) - (Date.now() / 1000)) > 0) {
      this.reminderData =  this.datePipe.transform(reminder, 'd MMM hh:mm a  ');
      return true;
    }
    return false;
  }

  sendMessage(note, detail) {
    const data = {
      reminder: note,
      noteDetail: detail
    };
    this.childmessage.emit(data);
  }

  addedLabel(note, label) {
    console.log(lableValue => lableValue === label);
    console.log(note.label);
    console.log(label);
    return note.label.some(lableValue => lableValue === label);
  }

  removeLable(note, labelToDelete) {
    let labelList = [...note.label];
    labelList = labelList.filter(label => label !== labelToDelete);
    // remove label form note and update note with updated labels
    console.log('remove this label', labelToDelete, labelList);
    // this.updateNoteDetails({ label: labelList }, note.id);
    const data = {
      dataForUpdate: { label: labelList },
      urlCridetial: note
    };
    this.childmessage.emit(data);
  }
  addLabel(note, newLabel) {
    const labelList = [...note.label];
    labelList.push(newLabel);
    // add label into note and update note with updated labels
    console.log('add this label', newLabel);
    // this.updateNoteDetails({ label: labelList }, note.id);
    const data = {
      dataForUpdate: { label: labelList },
      urlCridetial: note
    };
    this.childmessage.emit(data);
  }


  moveTrash(note) {
    console.log(note);
    const noteDetail: Note = new Note();
    noteDetail.is_trashed = true;
    this.data.dataForUpdate = noteDetail;
    this.data.urlCridetial = note;
    this.childmessage.emit(this.data);
    // this.noteService.updateNote(noteDetail, noteId, this.token).subscribe(
    //   result => {
    //     console.log('This note is updated just now: -> ', result);
    //     this.updatedData = result.data;

    //     this.getNote = this.getNote.filter(note => note.id !== noteId);
    //   },
    //   err => console.log('failed to load api' + err)
    // );
  }

  changeList() {
    if (this.viewListGrid) {
      const style = {
        width: '100%',
        'flex-direction': 'column'
      };
      return style;
    }
    // else {
    //   const style = {
    //     'fxFlex.sm': '50',
    //     'fxFlex.xs': '100',
    //     'flex-direction': 'row'
    //   };
    //   return style;
    // }
  }
  noteColor(color) {
    const style = {
      'background-color': color
    };
    return style;
  }

  archiveNote(note) {
    const noteDetail: Note = new Note();
    noteDetail.is_archive = true;

    this.data.dataForUpdate = noteDetail;
    this.data.urlCridetial = note;
    this.childmessage.emit(this.data);
    // this.noteService.updateNote(noteDetail, noteId, this.token).subscribe(
    //   result => {
    //     console.log('This note is updated just now: -> ', result);
    //     this.updatedData = result;

    //     this.getNote = this.getNote.filter(note => note.id !== noteId);
    //   },
    //   err => console.log('failed to load api' + err)
    // );
  }

  changeColor(note, color) {
    const noteDetail: Note = new Note();
    noteDetail.change_color = color;
    console.log(color);
    // this.updateNoteDetails(noteDetail, note.id);
    const data = {
      dataForUpdate: noteDetail,
      urlCridetial: note
    };
    this.childmessage.emit(data);
    // this.noteService.updateNote(noteDetail, noteId, this.token).subscribe(
    //   result => {
    //     console.log('This note is updated just now: -> ', result);
    //     this.updatedData = result.data;
    //     console.log(this.updatedData);
    //     this.getNote = this.getNote.filter(note => note.id !== noteId);
    //     this.getNote.push(this.updatedData);
    //   },
    //   err => {
    //     console.log('failed to load api' + err);
    //     alert('failed to load api');
    //   }
    // );
  }
  getFile(note) {
    this.noteIdTemp = note;
    document.getElementById('setNoteImage').click();
  }

  onFileSelected(target) {
    const noteImage = target.files[0];
    const uploadData = new FormData();
    uploadData.append('image', noteImage, noteImage.name);
    // this.updateNoteDetails(uploadData,  this.noteIdTemp);
    const data = {
      dataForUpdate: uploadData,
      urlCridetial: this.noteIdTemp
    };
    this.childmessage.emit(data);
  }

  test(noteId) {
    console.log('test method', noteId);

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
        // this.updateNoteDetails(result, note.id);
        const data = {
          dataForUpdate: result,
          urlCridetial: note
        };
        this.childmessage.emit(data);
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

      if (result !== undefined) {
        if (note.collaborate.length !== result.length) {
          // this.updateNoteDetails({ collaborate: result }, note.id);
          const data = {
            dataForUpdate: {collaborate: result},
            urlCridetial: note
          };
          this.childmessage.emit(data);
        }
      }
      console.log('Dialog box closed and result is ', result);
    },
      err => {
        console.log('Some thing is wrong: ', err);
      });
  }



  // updateNoteDetails(newDetails: any, noteId) {
    //   console.log(newDetails);

    //   this.noteService.updateNote(newDetails, noteId, this.token).subscribe(
    //     result => {
    //       console.log('This note is updated just now: -> ', result);
    //       this.snackBar.open('data successfully update.')._dismissAfter(2000);
    //       this.getNote = this.getNote.filter(updatedNote => updatedNote.id !== noteId);
    //       this.getNote.push(result.data);
    //       console.log(this.getNote, newDetails);
    //       // this.dataservice.
    //     },
    //     err => {
    //       // console.log(err.error.s);
    //       if (err.status === 404) {
    //         console.log('Page not found!');
    //         this.snackBar.open('Page not found.', 'close')._dismissAfter(3000);
    //       } else if ( err.status === 401) {
    //         localStorage.clear();
    //         this.router.navigate(['/login']);
    //         this.snackBar.open('Your access token is expired.', 'close')._dismissAfter(2000);
    //       } else {
    //         console.log('failed to update: ', err);
    //       }
    //     }
    //   );
    // }
}

