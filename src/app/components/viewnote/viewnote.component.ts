import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  private datetimereminder = new Date(Date.now());

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
    public dialog: MatDialog,
    private dataservice: DataService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit() {
    this.dataservice.currentMessage.subscribe(notes => this.getNote = notes);
    this.dataservice.currentLabels.subscribe(labels => this.allLabels = labels);
  }
  setPinNote(note) {
    const data = {
      dataForUpdate: {is_pin: !note.is_pin},
      urlCridetial: note
    };
    console.log(data);

    this.childmessage.emit(data);
  }
  setReminder(note) {
    const data = {
      dataForUpdate: {reminder: this.datePipe.transform(this.datetimereminder.toISOString(), 'yyyy-MM-dd HH:mm:ss')},
      urlCridetial: note
    };
    console.log(typeof data.dataForUpdate.reminder);
    console.log(this.datePipe.transform(this.datetimereminder.toISOString(), 'yyyy-MM-dd HH:mm:ss'));
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
    const data = {
      dataForUpdate: { label: labelList },
      urlCridetial: note
    };
    this.childmessage.emit(data);
  }


  moveTrash(note) {
    console.log(note);
    const noteDetail = {
      is_trashed: true
    };
    this.data.dataForUpdate = noteDetail;
    this.data.urlCridetial = note;
    this.childmessage.emit(this.data);
  }


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
  noteColor(color) {
    const style = {
      'background-color': color
    };
    return style;
  }

  archiveNote(note) {
    const noteDetail = {
      is_archive: true
    };

    this.data.dataForUpdate = noteDetail;
    this.data.urlCridetial = note;
    this.childmessage.emit(this.data);
  }

  changeColor(note, color) {
    const noteDetail = {
    change_color: color
    };
    console.log(color);
    const data = {
      dataForUpdate: noteDetail,
      urlCridetial: note
    };
    this.childmessage.emit(data);
  }
  getFile(note) {
    this.noteIdTemp = note;
    document.getElementById('setNoteImage').click();
  }

  onFileSelected(target) {
    const noteImage = target.files[0];
    const uploadData = new FormData();
    uploadData.append('image', noteImage, noteImage.name);
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

}

