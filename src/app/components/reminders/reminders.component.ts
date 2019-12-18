import { Component, OnInit} from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements
OnInit {

  // @Input() getNote:[];
  private reminderNotes = [];
  token = localStorage.getItem('token');

  constructor(private noteservice: NoteServiceService,
              private snackbar: MatSnackBar
              ) { }
  ngOnInit() {

    // console.log('ng on init method call Reminder');
    this.noteservice.getReminderNotes(this.token).subscribe(
      response => {
        this.reminderNotes = response.data;
        console.log('Reminder Notes: ', this.reminderNotes);
      },
      err => {
        this.reminderNotes = null;
        this.snackbar.open('some thing is wrong', 'close')._dismissAfter(2500);
        console.log('error: ', err);
      }
    );
  }
}
