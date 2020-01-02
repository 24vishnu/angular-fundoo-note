import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { CollaborateComponent } from '../collaborate/collaborate.component';
import { Label } from 'src/app/models/label';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  providers: [DatePipe]
})
export class ArchiveComponent implements OnInit {

  public token: string;
  private reminderData: string;
  private noteIdTemp: number;
  private allLabels: Label[];
  private datetimereminder = new Date(Date.now());

  public data = {
    dataForUpdate: {},
    urlCridetial: Note,
    showMessage: ''
  };
  private archiveNotes;
  // private updateData;

  @Input() viewListGrid: boolean;
  @Output() archiveComponentMessage = new EventEmitter<any>();

  constructor(
    private dataservice: DataService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.dataservice.allArchivedNote.subscribe(notes => this.archiveNotes = notes);
    this.dataservice.getLabelNotes.subscribe(labels => this.allLabels = labels);
  }

  moveInTrash(note) {
    const newDetails = {
        is_trashed: true
      };

    this.data.dataForUpdate = newDetails;
    this.data.urlCridetial = note;
    this.data.showMessage = 'Note trashed';
    this.dataservice.updateNoteDetails(this.data);
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

  removeLable(note, labelToDelete) {
    let labelList = [...note.label];
    labelList = labelList.filter(label => label !== labelToDelete);
    // remove label form note and update note with updated labels
    console.log('remove this label', labelToDelete, labelList);
    const data = {
      dataForUpdate: { label: labelList },
      urlCridetial: note,
      showMessage: ''
    };
    this.dataservice.updateNoteDetails(data);
  }

  // add and remove collaborate
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

  // add image into note
  getFile(note) {
    this.noteIdTemp = note;
    document.getElementById('setNoteImage').click();
  }
  onFileSelected(target) {
    const noteImage = target.files[0];
    const uploadData = new FormData();
    console.log(noteImage);

    uploadData.append('image', noteImage, noteImage.name);
    const data = {
      dataForUpdate: uploadData,
      urlCridetial: this.noteIdTemp,
      showMessage: 'Image added'
    };
    this.dataservice.updateNoteDetails(data);
  }

  // change note background color
  changeColor(note, color) {
    const noteDetail = {
    change_color: color
    };
    console.log(color);
    const data = {
      dataForUpdate: noteDetail,
      urlCridetial: note,
      showMessage: ''
    };
    this.dataservice.updateNoteDetails(data);
  }

  // move note into trash notes list
  moveTrash(note) {
    console.log(note);
    const noteDetail = {
      is_trashed: true
    };
    this.data.dataForUpdate = noteDetail;
    this.data.urlCridetial = note;
    this.data.showMessage = 'Note trashed';
    this.dataservice.updateNoteDetails(this.data);
  }

  // open dialog edit note
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

  // set archive to unarchive note
  unArchive(note) {
    const newDetails = {
      is_archive: false
    };
    console.log(note);
    this.data.dataForUpdate = newDetails;
    this.data.urlCridetial = note;
    this.data.showMessage = 'Note unarchived';
    this.dataservice.updateNoteDetails(this.data);
}

}
