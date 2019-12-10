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
export class DashboardComponent implements OnInit{
  viewListGrid_message = false; //parent to chaild communication
  // private viewChangeFlag;
  oneNote: any;
  private user_info = {
    username: 'admin',
    email: 'admin@gmail.com',
    image_url: 'assets/images/profile.jpg',

  };
  private labelsList: any;
  
  token = localStorage.getItem('token');

  viewChange(){
    this.viewListGrid_message = !this.viewListGrid_message
  }

  viewFlag={
    "noteFlag": true,
    "reminderFlag": false,
    "archiveFlag": false,
    "trashFlag": false
  }

  showNoteContent = true;
  constructor(private router: Router,
     private userService: UserService, 
     private dialog: MatDialog,
     private activatedRoute: ActivatedRoute,
     private dataservice: DataService
          ) { 
      //  console.log('constructor called');
     }


  ngOnInit() {
    this.getProfilePic();
    this.dataservice.currentLabels.subscribe(labels => this.labelsList = labels); 

    this.viewFlag.archiveFlag = this.router.url.includes('/archive')
    this.viewFlag.reminderFlag = this.router.url.includes('/reminder')
    this.viewFlag.trashFlag = this.router.url.includes('/trash')
    if (this.viewFlag.archiveFlag || this.viewFlag.trashFlag || this.viewFlag.reminderFlag)
    {
      this.viewFlag.noteFlag = false
    }    
  }

  showView(show_me){
    Object.keys(this.viewFlag).forEach(v => this.viewFlag[v] = false);
    this.viewFlag[show_me] = true;
    console.log(this.viewFlag);
  }

  getProfilePic(){
    this.userService.getProfilePic(this.token).subscribe(
      result => {
        if(result.success)
        {
          this.user_info = result.data;
          // this.username = this.user_info['username'];
          // this.email = this.user_info['email'];
          // this.profile_pic = result.data.image_url;//this.user_info['image_url']
        }
      },
      err => console.log('failed to load labels' + err)

    );
  }

  picChangeDialog(){
    const dialogRef = this.dialog.open(ChangeProfilePictureComponent,
      {
        panelClass: 'pic-change-class',
        // height: '50%',
        // width: '50%'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed:${result}`);
      this.user_info.image_url = result.image_url;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      width:'300px',
      height:'350px',
      data: { name :this.labelsList}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed: ${this.labelsList}`);
    });
  }
  signout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}