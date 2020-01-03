import { Component, OnInit, Input, Output, EventEmitter, OnChanges, DoCheck } from '@angular/core';
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
export class ViewnoteComponent implements OnInit, DoCheck {
  private datetimereminder = new Date(Date.now());

  private getNote: Note[];
  private allLabels: Label[];
  private noteIdTemp: number;
  private reminderData: string;
  public gridListView = false;

  public data = {
    dataForUpdate: {},
    urlCridetial: Note,
    showMessage: ''
  };

  private viewListGrid: boolean;

  @Output() viewComponentMessage = new EventEmitter<any>();

  ngDoCheck() {
    this.viewListGrid = this.dataservice.gridListView;
  }

  constructor(
    public dialog: MatDialog,
    private dataservice: DataService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit() {
    // debugger;
    this.dataservice.noteMessage.subscribe(notes => this.getNote = notes);
    this.dataservice.getLabelNotes.subscribe(labels => this.allLabels = labels);
  }
  setPinNote(note) {
    const data = {
      dataForUpdate: {is_pin: !note.is_pin},
      urlCridetial: note,
      showMessage: ''
    };

    this.dataservice.updateNoteDetails(data);
  }
  setReminder(note) {
    const data = {
      dataForUpdate: {reminder: this.datePipe.transform(this.datetimereminder.toISOString(), 'yyyy-MM-dd HH:mm:ss')},
      urlCridetial: note,
      showMessage: ''
    };
    this.dataservice.updateNoteDetails(data);
  }

  getReminder(reminder) {
    if (reminder !== null && ((Date.parse(reminder) / 1000) - (Date.now() / 1000)) > 0) {
      this.reminderData =  this.datePipe.transform(reminder, 'd MMM hh:mm a  ');
      return true;
    }
    return false;
  }


  addedLabel(note, updatelabel) {
    let noteLabels = note.label;
    if (noteLabels.includes(updatelabel)) {
      noteLabels = noteLabels.filter(label => label !== updatelabel);
      this.data.dataForUpdate = { label: noteLabels};
      this.data.urlCridetial = note;
    } else {
      noteLabels = noteLabels.concat([updatelabel]);
      this.data.dataForUpdate = { label: noteLabels};
      this.data.urlCridetial = note;
    }
    this.dataservice.updateNoteDetails(this.data);
  }

  removeLable(note, labelToDelete) {
    let labelList = [...note.label];
    labelList = labelList.filter(label => label !== labelToDelete);
    const data = {
      dataForUpdate: { label: labelList },
      urlCridetial: note,
      showMessage: ''
    };
    this.dataservice.updateNoteDetails(data);
  }

  addLabel(note, newLabel) {
    const labelList = [...note.label];
    labelList.push(newLabel);
    const data = {
      dataForUpdate: { label: labelList },
      urlCridetial: note,
      showMessage: ''
    };
    this.dataservice.updateNoteDetails(data);
  }


  moveTrash(note) {
    const noteDetail = {
      is_trashed: true
    };
    this.data.dataForUpdate = noteDetail;
    this.data.urlCridetial = note;
    this.data.showMessage = 'Note trashed';
    this.dataservice.updateNoteDetails(this.data);
  }

  noteColor(color) {
    const style = {
      'background-color': color,
    };
    return style;
  }

  archiveNote(note) {
    const noteDetail = {
      is_archive: true
    };

    this.data.dataForUpdate = noteDetail;
    this.data.urlCridetial = note;
    this.data.showMessage = 'Note archived.';
    this.dataservice.updateNoteDetails(this.data);
  }

  changeColor(note, color) {
    const noteDetail = {
    change_color: color
    };
    const data = {
      dataForUpdate: noteDetail,
      urlCridetial: note,
      showMessage: ''
    };
    // this.dataservice.updateNoteDetails(data);
    this.dataservice.updateNoteDetails(data);
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
      urlCridetial: this.noteIdTemp,
      showMessage: 'Image added'
    };
    this.dataservice.updateNoteDetails(data);
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
          urlCridetial: note,
          showMessage: 'Note saved'
        };
        this.dataservice.updateNoteDetails(data);
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
            urlCridetial: note,
            showMessage: ''
          };
          this.dataservice.updateNoteDetails(data);
        }
      }
      console.log('Dialog box closed and result is ', result);
    },
      err => {
        console.log('Some thing is wrong: ', err);
      });
  }

}

