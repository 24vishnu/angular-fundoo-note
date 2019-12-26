import { Component, OnInit, DoCheck } from '@angular/core';
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
export class DashboardComponent implements OnInit, DoCheck {
  public viewListGridMessage = false; // parent to chaild communication
  public setLabelId: number;


  public oneNote: Note;
  public allNotes: Note[];
  public showNoteContent = true;
  private labelsList: Label[];
  public naveMode = 'side';
  public naveModeFlag: boolean;
  private searchItem = '';

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

  ngDoCheck() {
    if (window.innerWidth < 1035) {
      this.naveMode = 'over';
      this.naveModeFlag = true;
    } else {
      this.naveMode = 'side';
      this.naveModeFlag = false;
    }
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

  // search notes
  searchNote($event) {
    this.searchItem = $event.target.value;
    console.log(this.searchItem);
    if (this.searchItem.length > 2) {
      this.noteservice.searchNotes(this.searchItem, this.token).subscribe(
        result => {
          console.log(result);
          // console.log('result in data services', result);
        },
        err => {
          if (err.status === 401) {
            localStorage.clear();
            this.router.navigate(['/login']);
            alert(err.error.messages[0].message);
          } else if (err.status === 0) {
            alert(err.message);
            } else {
            console.log(err);
          }
        }
      );
    }
  }

  notesOfLabel(labelId) {
    this.setLabelId = labelId;
    console.log('nothing : ', labelId);
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
        if (result.data.is_archive === false && result.data.is_trashed === false) {
          this.allNotes.push(result.data);
          console.log(this.allNotes);
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

