import { Component, OnInit, Output, EventEmitter, DoCheck} from '@angular/core';
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
export class RemindersComponent implements OnInit, DoCheck {

  private viewListGrid: boolean;

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
  ngDoCheck() {
    this.viewListGrid = this.dataservice.gridListView;
  }
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
