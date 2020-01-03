import { Component, OnInit, Optional, Inject } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-collaborate',
  templateUrl: './collaborate.component.html',
  styleUrls: ['./collaborate.component.scss']
})
export class CollaborateComponent implements OnInit {
  private userInfo: any;
  private token: string;
  public newPerson = new FormControl('', [Validators.email, ]);
  private collaboratePerson: string[] = [];

  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private dataservice: DataService,
    private snackBar: MatSnackBar,
    private userservices: UserService,
    @Optional() public dialogRef: MatDialogRef<CollaborateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note
    ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.collaboratePerson = [...this.data.collaborate];
    this.dataservice.currentUser.subscribe(user => this.userInfo = user);
    this.userCollaborators();
// ---------------------------------------
    this.filteredOptions = this.newPerson.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

// ----------------------------------
  userCollaborators() {
    this.userservices.getCollaborators(this.token).subscribe(
      result => {
        this.options = result.data.map(collaborator => collaborator.email);
      },
      err => {
        this.snackBar.open('Server error', 'close')._dismissAfter(2000);
      }
    );
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
    this.dialogRef.close(this.collaboratePerson);
  }
}
