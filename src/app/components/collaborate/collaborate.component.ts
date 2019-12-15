import { Component, OnInit, Optional, Inject } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';


@Component({
  selector: 'app-collaborate',
  templateUrl: './collaborate.component.html',
  styleUrls: ['./collaborate.component.scss']
})
export class CollaborateComponent implements OnInit {
  private userInfo: any;
  private token: string;
  public newPerson = new FormControl('', [Validators.email, ]);
  private collaboratePerson: string[] =  [];

  constructor(
    private dataservice: DataService,
    private snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<CollaborateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note
    ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    console.log(this.data.collaborate);
    this.collaboratePerson = [...this.data.collaborate];
    this.dataservice.currentUser.subscribe(user => this.userInfo = user);
  }

  setImage() {
    const style = {
      'background-image': 'url(' + this.userInfo.image_url + ')',
      'background-size': 'cover'
    };
    return style;
  }
  addPerson() {
    if ( !this.newPerson.hasError('email') ) {
      if (this.newPerson.value !== '') {
        console.log(this.newPerson);
        if (this.data.collaborate.indexOf(this.newPerson.value) !== -1) {
          console.log('this person already added!');
        } else {
          this.collaboratePerson.push(this.newPerson.value);
        }
      }
      this.closeDialog();
    } else {
      this.snackBar.open('Please enter valid email address !', 'close')._dismissAfter(2500);
    }
  }

  deletePerson(person: string) {
    this.collaboratePerson.splice( this.collaboratePerson.indexOf(person), 1 );
  }

  closeDialog() {
    console.log(this.data);
    this.dialogRef.close(this.collaboratePerson);
  }
}
