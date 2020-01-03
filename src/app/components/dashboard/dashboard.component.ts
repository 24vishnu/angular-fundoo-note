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

  private userInfo: any;

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

    if ( window.innerWidth < 600) {
        this.viewListGridMessage = false;
        this.dataservice.gridListView = true;
    } else {
      this.dataservice.gridListView = this.viewListGridMessage;
    }
  }
  viewChange() {
    if (window.innerWidth > 599) {
      this.viewListGridMessage = !this.viewListGridMessage;
    }
  }


  ngOnInit() {
    this.dataservice.getLabelNotes.subscribe(labels => this.labelsList = labels);
    this.dataservice.noteMessage.subscribe(notes => this.allNotes = notes);
    this.dataservice.currentUser.subscribe(user => this.userInfo = user);
  }

  // search notes
  searchNote($event) {
    this.dataservice.searchNote($event);
  }

  notesOfLabel(labelId) {
    this.dataservice.labelIdSearch(labelId);
  }


  picChangeDialog() {
    const dialogRef = this.dialog.open(ChangeProfilePictureComponent,
      {
        width: '750px',
        height: '450px'
      });

    dialogRef.afterClosed().subscribe(result => {
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
}

