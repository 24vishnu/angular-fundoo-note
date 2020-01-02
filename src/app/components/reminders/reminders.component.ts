import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from 'src/app/models/note';
import { DataService } from 'src/app/service/data.service';
import { Label } from 'src/app/models/label';
import { DatePipe } from '@angular/common';
import { CollaborateComponent } from '../collaborate/collaborate.component';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss'],
  providers: [DatePipe]
})
export class RemindersComponent implements OnInit {

  @Input() viewListGrid: boolean;
  @Output() reminderComponentMessage = new EventEmitter<any>();

  private reminderNotes: Note[];
  private token: string;
  private allLabels: Label[];

  private reminderData: string;
  private noteIdTemp: number;
  private datetimereminder = new Date(Date.now());
  public data = {
    dataForUpdate: {},
    urlCridetial: Note,
    showMessage: ''
  };

  constructor(private noteservice: NoteServiceService,
              private snackbar: MatSnackBar,
              private dataservice: DataService,
              private datePipe: DatePipe,
              public dialog: MatDialog,
              ) { }


  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.dataservice.getLabelNotes.subscribe(labels => this.allLabels = labels);
    this.userReminderNotes();
  }

  // call getReminderNotes from note services
  userReminderNotes() {
    this.noteservice.getReminderNotes(this.token).subscribe(
      response => {
        this.reminderNotes = response.data.pending;
        console.log('Reminder Notes: ', this.reminderNotes);

      },
      err => {
        this.reminderNotes = null;
        this.snackbar.open('some thing is wrong', 'close')._dismissAfter(2500);
        console.log('error: ', err);
      }
    );
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


  // set not as a trash note
  moveInTrash(note) {
    const newDetails = {
        is_trashed: true
      };

    this.data.dataForUpdate = newDetails;
    this.data.urlCridetial = note;
    this.data.showMessage = 'note trashed';
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
          showMessage: ''
        };
        this.dataservice.updateNoteDetails(data);
      }
      console.log('The dialog has been closed and result is ', result);
    });
  }

  // set note as archive
  archiveNote(note) {
    const noteDetail = {
      is_archive: true
    };

    this.data.dataForUpdate = noteDetail;
    this.data.urlCridetial = note;
    this.data.showMessage = 'Note archived';
    this.dataservice.updateNoteDetails(this.data);
  }
}
