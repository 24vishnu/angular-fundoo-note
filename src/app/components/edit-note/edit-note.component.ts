import { Component, OnInit, Optional, 
  Inject, OnChanges, AfterContentInit, 
  OnDestroy, SimpleChanges, DoCheck } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit, AfterContentInit, OnDestroy{
  token = localStorage.getItem('token');
  private note_data: any;
  public noteStyle;
  note: any;
  hour: any;
  minuts: any;
  message:any;

  ngOnDestroy(){
    this.closeDialog();
  }
  ngAfterContentInit(){
    this.noteStyle={
      'background-color': this.note[0].change_color  
    }
  }

  constructor(
      private noteService: NoteServiceService,
      private snackBar: MatSnackBar,
      private dataservice: DataService,
      @Optional() public dialogRef: MatDialogRef<EditNoteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
      ) { }

  ngOnInit() {
    // this.dataservice.currentMessage.subscribe(message => this.message = message);
    this.note = [this.data];
    console.log(this.note[0].change_color)
    this.startTime()
  }
  // newMessage() {
  //   this.dataservice.changeMessage(this.note)
  // }
  showHideButton(note){
    console.log(note)
    //   this.note_data = {
    //     // title : this.title.value,
    //     // content : this.content.value
    //   };
    //   // show data on console
    //   console.log(this.note_data);
    //   // if user enter note title or note description then add note
    //   if(this.note_data.title != null || this.note_data.content != null)
    //   {
    //     // post data on backend api
    //     this.noteService.addNote(this.note_data, this.token).subscribe(
    //       result =>{
    //         this.snackBar.open("Note successfully added", "close")
    //         ._dismissAfter(2500);
    //         //print the result on console
    //         console.log(result)
    //         // call ngOnInit() method
    //         this.ngOnInit();
    //       },
    //      err => {
    //        //print if error occur during add note data  in database
    //        console.log(err);
    //        this.snackBar.open('Error: your data not storing in database')._dismissAfter(2500);
    //      }
    //     );
    //     /*
    //       Resets the form control, marking it pristine and untouched, and setting the value to null.
    //     */
    //     //  this.title.reset();
    //     //  this.content.reset();
    // }
  }


startTime() {
    var today = new Date();
    this.hour = today.getHours();
    this.minuts = today.getMinutes();
    if (this.minuts < 10) {
      this.minuts = "0" + this.minuts;
    };
    var t = setTimeout(this.startTime, 500);
  }
 
  closeDialog() {
    console.log(this.note)
    this.dialogRef.close(this.note);
  }

}
