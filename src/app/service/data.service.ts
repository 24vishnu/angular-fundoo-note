import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NoteServiceService } from './note-service.service';
import { LabelService } from './label.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Note } from '../models/note';
import { Label } from '../models/label';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public allNotes: Note[];
  public trashNotes: Note[];
  public ArchiveNotes: Note[];
  public allLabels: Label[];

  public pinNotes: Note[];
  public unPinNotes: Note[];

  public gridListView = false;
  public noteLabelsId: number;

  public searchedNote = {
    notes: [],
    searchContentSize: 0
  };

  public userInfo = {
    username: 'Anonymous',
    email: 'user@gmail.com',
    image_url: 'assets/images/profile.jpg',
  };

  public token = localStorage.getItem('token');

  private messageSource = new BehaviorSubject<Note[]>(this.allNotes);
  noteMessage = this.messageSource.asObservable();

  private userDetails = new BehaviorSubject<any>(this.userInfo);
  currentUser = this.userDetails.asObservable();

  private labelSource = new BehaviorSubject<Label[]>(this.allLabels);
  getLabelNotes = this.labelSource.asObservable();

  private trashNoteData = new BehaviorSubject<Note[]>(this.trashNotes);
  allTrashNote = this.trashNoteData.asObservable();

  private archivedNoteData = new BehaviorSubject<Note[]>(this.ArchiveNotes);
  allArchivedNote = this.archivedNoteData.asObservable();

  private searchNoteData = new BehaviorSubject<any>(this.searchedNote);
  searchNoteResult = this.searchNoteData.asObservable();

  constructor(
    private noteservice: NoteServiceService,
    private lableservices: LabelService,
    private userService: UserService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
      this.getUserDetails();
      this.get_all_note();
      this.get_all_label();
      this.getTrashNotes();
      this.getCurrentArchiveNotes();
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
  getTrashNotes() {
    this.noteservice.getTrashedNotes(this.token).subscribe(
      result => {
        this.trashNotes = result.data;
        this.changeTrashData(this.trashNotes);
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

  // Get archive notes from database
  getCurrentArchiveNotes() {
    this.noteservice.getArchiveNotes(this.token).subscribe(
      result => {
        this.ArchiveNotes = result.data;
        this.changeArchiveData(this.ArchiveNotes);
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

  // Function for get all notes
  get_all_note() {
    this.noteservice.getNotes(this.token).subscribe(
      result => {
        this.allNotes = result.data;
        this.changeNoteMessage(this.allNotes);

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

  // function for next change for all subscriber components
  changeNoteMessage(message: Note[]) {

    // TODO
    message.sort((a, b) => a.id - b.id);
    this.messageSource.next(message);
    this.getTrashNotes();
    this.getCurrentArchiveNotes();
  }

  // function for next change of label data
  changeLables(message: Label[]) {
    this.labelSource.next(message);
  }

  // trash notes update for all subscriber component
  changeTrashData(trashData: Note[]) {
    trashData.sort((a, b) => a.id - b.id);
    this.trashNoteData.next(trashData);
  }

  // archive notes update for all subscriber components
  changeArchiveData(archiveData: Note[]) {
    archiveData.sort((a, b) => a.id - b.id);
    this.archivedNoteData.next(archiveData);
  }

  updateNoteDetails(infoForUpdate) {
    console.log(infoForUpdate);
    this.noteservice.updateNote(infoForUpdate.dataForUpdate, infoForUpdate.urlCridetial.id, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ', result);
        if (infoForUpdate.showMessage !== '') {
          this.snackBar.open(infoForUpdate.showMessage)._dismissAfter(2000);
        }
        this.allNotes = this.allNotes.filter(updatedNote => updatedNote.id !== infoForUpdate.urlCridetial.id);
        if (result.data.is_archive === false && result.data.is_trashed === false) {
          this.allNotes.push(result.data);
          console.log(this.allNotes);
        }
        this.changeNoteMessage(this.allNotes);
        console.log(result);

      },
      err => {
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

  searchNote($event) {
    if ($event.target.value.length > 2) {
      this.searchedNote.searchContentSize = $event.target.value.length;
      this.noteservice.searchNotes($event.target.value, this.token).subscribe(
        result => {
          this.searchedNote.notes = result.data;
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
    } else {
      this.searchedNote.notes = [];
    }
  }

  labelIdSearch(id) {
    this.noteLabelsId = id;
    console.log(this.noteLabelsId);
  }
}
