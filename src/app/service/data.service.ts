import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NoteServiceService } from './note-service.service';
import { LabelService } from './label.service';
import { Router } from '@angular/router';
import { Note } from '../models/note';
import { Label } from '../models/label';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public allNotes: Note[];
  public trashNotes: Note[];
  public allLabels: Label[];
  public userInfo = {
    username: 'Anonymous',
    email: 'user@gmail.com',
    image_url: 'assets/images/profile.jpg',
  };

  public token = localStorage.getItem('token');

  private messageSource = new BehaviorSubject<Note[]>(this.allNotes);
  currentMessage = this.messageSource.asObservable();

  private userDetails = new BehaviorSubject<any>(this.userInfo);
  currentUser = this.userDetails.asObservable();

  private labelSource = new BehaviorSubject<Label[]>(this.allLabels);
  currentLabels = this.labelSource.asObservable();

  private trashNoteData = new BehaviorSubject<Note[]>(this.trashNotes);
  currentTrashNote = this.trashNoteData.asObservable();

  constructor(
    private noteservice: NoteServiceService,
    private lableservices: LabelService,
    private userService: UserService,
    private router: Router
    ) {
    this.getUserDetails();
    this.get_all_note();
    this.get_all_label();
    this.getCurrentTrashNotes();
  }

  // user details from database like username email and profile pic
  getUserDetails() {
    this.userService.getProfilePic(this.token).subscribe(
      result => {
        if (result.success) {
          this.userInfo = result.data;
          this.userDetail(this.userInfo);
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
          console.log(err);
        }
      }
    );
  }

  // Get trash notes from database
  getCurrentTrashNotes() {
    this.noteservice.getTrashedNotes(this.token).subscribe(
      result => {
        this.trashNotes = result.data;
        this.changeTrashData(this.trashNotes);
        console.log('result in data services', result);
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

  // Function for get all notes
  get_all_note() {
    this.noteservice.getNotes(this.token).subscribe(
      result => {
        this.allNotes = result.data;
        this.changeMessage(this.allNotes);
        console.log('result in data services', result);
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

  // Function for get all labels
  get_all_label() {
    this.lableservices.getLabels(this.token).subscribe(
      result => {
        this.allLabels = result.data;
        this.changeLables(this.allLabels);
        // console.log(result)
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

  // user details like username email and profile pic update to all components
  userDetail(user) {
    this.userDetails.next(user);
  }

  // function for next change of message data
  changeMessage(message: Note[]) {
    this.messageSource.next(message);
  }

  // function for next change of label data
  changeLables(message: Label[]) {
    this.labelSource.next(message);
  }

  // trash notes update for all component
  changeTrashData(trashData: Note[]) {
    this.trashNoteData.next(trashData);
  }

}
