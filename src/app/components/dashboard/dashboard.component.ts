import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
// import { ViewnoteComponent } from '../viewnote/viewnote.component'
import { UserService } from 'src/app/service/user.service';
import { DataService } from 'src/app/service/data.service';
import { ChangeProfilePictureComponent } from '../change-profile-picture/change-profile-picture.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public viewListGridMessage = false; // parent to chaild communication
  public oneNote: any;
  public showNoteContent = true;
  private labelsList: any;


  private token: string;
  private userInfo = {
    username: 'admin',
    email: 'admin@gmail.com',
    image_url: 'assets/images/profile.jpg',

  };
  viewFlag = {
    noteFlag: true,
    reminderFlag: false,
    archiveFlag: false,
    trashFlag: false
  };

  constructor(private router: Router,
              private userService: UserService,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private dataservice: DataService
                    ) {
     }

  viewChange() {
    this.viewListGridMessage = !this.viewListGridMessage;
  }


  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.getProfilePic();
    this.dataservice.currentLabels.subscribe(labels => this.labelsList = labels);

    this.viewFlag.archiveFlag = this.router.url.includes('/archive');
    this.viewFlag.reminderFlag = this.router.url.includes('/reminder');
    this.viewFlag.trashFlag = this.router.url.includes('/trash');
    if (this.viewFlag.archiveFlag || this.viewFlag.trashFlag || this.viewFlag.reminderFlag) {
      this.viewFlag.noteFlag = false;
    }
  }

  showView(showMe) {
    Object.keys(this.viewFlag).forEach(v => this.viewFlag[v] = false);
    this.viewFlag[showMe] = true;
    console.log(this.viewFlag);
  }

  getProfilePic() {
    this.userService.getProfilePic(this.token).subscribe(
      result => {
        if (result.success) {
          this.userInfo = result.data;
        }
      },
      err => {
        alert(err.error.messages[0].message);
    }

    );
  }

  picChangeDialog() {
    const dialogRef = this.dialog.open(ChangeProfilePictureComponent,
      {
        width: '750px',
        height: '450px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed:${result}`);
      if (result !== undefined) {
        this.userInfo.image_url = result.image_url;
      }
    },
    err => {
        alert(err.error.messages[0].message);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      data: { name: this.labelsList}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed: ${this.labelsList}`);
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
