import { Component, OnInit, Input, AfterViewChecked, AfterContentChecked, 
  AfterContentInit, AfterViewInit, DoCheck, OnChanges, OnDestroy } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements 
OnInit, 
AfterViewChecked, 
AfterContentInit,
OnChanges,
AfterViewInit,
AfterContentChecked,
DoCheck,
OnDestroy {

  // @Input() getNote:[];
  private reminderNotes = [];
  token= localStorage.getItem('token');

  constructor(private noteservice: NoteServiceService) { }
  ngDoCheck(){
    // console.log('ngDOCHECK -- reminder');
  }
  ngOnChanges(){
    console.log('ngOnChange called Rreminder');
  }
  ngOnDestroy(){
    // console.log('ngOnDestroy Reminder')
  }
  ngOnInit() {

    // console.log('ng on init method call Reminder');
    this.noteservice.getArchiveNotes(this.token).subscribe(
      response => { 
        this.reminderNotes = response.data;
        console.log("Reminder Notes: ", this.reminderNotes); 
      },
      err => {
        this.reminderNotes = null;
        console.log('error: ',err);
      }
    );
  }
  ngAfterViewInit(){
    // console.log('after view inti reminder');
  }
  ngAfterContentInit(){
    // console.log('after content init reminder');
  }
  ngAfterContentChecked(){
    // console.log('after Content checked ,,,Reminder');
  }
  ngAfterViewChecked(){
    // console.log('After view Changed..Reminder ');
    // console.log(Object.getOwnPropertyNames(this.getNote));
    // console.log('this is called in reminder: ',this.getNote);
  }
}
