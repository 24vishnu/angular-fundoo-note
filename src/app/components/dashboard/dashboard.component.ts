import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { UserService } from 'src/app/service/user.service';
import { DataService } from 'src/app/service/data.service';
import { ChangeProfilePictureComponent } from '../change-profile-picture/change-profile-picture.component';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { Note } from 'src/app/models/note';
import { Label } from 'src/app/models/label';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public viewListGridMessage = false; // parent to chaild communication
  public setLabelId: number;


  public oneNote: Note;
  public allNotes: Note[];
  public showNoteContent = true;
  private labelsList: Label[];


  private token: string;
  private userInfo: any;
  viewFlag = {
    noteFlag: true,
    reminderFlag: false,
    archiveFlag: false,
    trashFlag: false,
    labelFlag: false
  };

  constructor(private router: Router,
              private dialog: MatDialog,
              private dataservice: DataService,
              private noteservice: NoteServiceService,
              private snackBar: MatSnackBar
                    ) {
     }

  viewChange() {
    this.viewListGridMessage = !this.viewListGridMessage;
  }


  ngOnInit() {
    this.token = localStorage.getItem('token');
    // this.getProfilePic();
    this.dataservice.currentLabels.subscribe(labels => this.labelsList = labels);
    this.dataservice.currentMessage.subscribe(notes => this.allNotes = notes);
    this.dataservice.currentUser.subscribe(user => this.userInfo = user);

    this.viewFlag.archiveFlag = this.router.url.includes('/archive');
    this.viewFlag.reminderFlag = this.router.url.includes('/reminder');
    this.viewFlag.trashFlag = this.router.url.includes('/trash');
    this.viewFlag.labelFlag = this.router.url.includes('/label');
    if (this.viewFlag.archiveFlag ||
          this.viewFlag.trashFlag ||
          this.viewFlag.reminderFlag ||
          this.viewFlag.labelFlag) {
      this.viewFlag.noteFlag = false;
    }
  }

  notesOfLabel(labelId) {
    this.setLabelId = labelId;
    console.log('nothing : ', labelId);
  }

  sidenavStyles(flag) {
    if (this.viewFlag[flag] === true) {
      const sidStyle = {
        'background-color': 'wheat',
        'border-radius': '25px'
      };
      return sidStyle;
    }
  }
  showView(showMe) {
    Object.keys(this.viewFlag).forEach(v => this.viewFlag[v] = false);
    this.viewFlag[showMe] = true;
    console.log(this.viewFlag);
  }

  picChangeDialog() {
    const dialogRef = this.dialog.open(ChangeProfilePictureComponent,
      {
        width: '750px',
        height: '450px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog has been closed:${result}`);
      if (result !== undefined) {
        this.userInfo.image_url = result.image_url;
      }
    },
    err => {
      if (err.status === 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
        alert(err.error.messages[0].message);
      } else if (err.status === 0) {
        alert(err.message);
        } else {
        console.log(err.error.messages[0].message);
        alert(err.error.messages[0].message);
      }
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      data: { name: this.labelsList}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog has been closed: ${this.labelsList}`);
    },
    err => {
        alert(err.error.messages[0].message);
    });
  }
  signout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  eventListener($event) {
    console.log($event);
    const noteDetail = new Note();
    // assign all requred data of current note
    noteDetail.title = $event.urlCridetial.title;
    noteDetail.content = $event.urlCridetial.content;
    noteDetail.change_color = $event.urlCridetial.change_color;
    noteDetail.is_archive = $event.urlCridetial.is_archive;
    noteDetail.is_trashed = $event.urlCridetial.is_trashed;
    noteDetail.image = $event.urlCridetial.image;
    noteDetail.reminder = $event.urlCridetial.reminder;
    noteDetail.label = $event.urlCridetial.label;
    noteDetail.collaborate = $event.urlCridetial.collaborate;

    // assigne data for update
    const kk = Object.keys($event.dataForUpdate);
    const vv = Object.values($event.dataForUpdate);
    noteDetail[kk[0]] = vv[0];

    this.updateNoteDetails($event.dataForUpdate, $event.urlCridetial.id);
  }

  // ================================
  updateNoteDetails(newDetails: any, noteId) {
    console.log(newDetails);
    this.noteservice.updateNote(newDetails, noteId, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        this.snackBar.open('data successfully update.')._dismissAfter(2000);
        this.allNotes = this.allNotes.filter(updatedNote => updatedNote.id !== noteId);
        if (result.data.is_archive === false && result.data.is_trash === false) {
          this.allNotes.push(result.data);
        }
        this.dataservice.changeNoteMessage(this.allNotes);
        console.log(result);

      },
      err => {
        // console.log(err.error.s);
        if (err.status === 404) {
          console.log('Page not found!');
          this.snackBar.open('Page not found.', 'close')._dismissAfter(3000);
        } else if ( err.status === 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
          this.snackBar.open('Your access token is expired.', 'close')._dismissAfter(2000);
        } else {
          console.log('failed to update: ', err);
        }
      }
    );
  }
}

