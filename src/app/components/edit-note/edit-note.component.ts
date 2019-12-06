import { Component, OnInit, Optional } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { ViewnoteComponent } from '../viewnote/viewnote.component';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  token = localStorage.getItem('token');
  private note_data: any;
  note: any;
  hour: any;
  minuts: any;
  constructor(
      private noteService: NoteServiceService,
      private snackBar: MatSnackBar,
      @Optional() public dialogRef: MatDialogRef<ViewnoteComponent>,
      ) { }

  ngOnInit() {
    this.getNote(70);
    this.startTime()
  }
  getNote(note_id){
    console.log('note toke : ', this.token);
    console.log('note ID : ', note_id);
    this.noteService.getOneNote(note_id, this.token).subscribe(
      response=>{
        console.log(response.data)
        this.note = response.data;
      },
      error=>{
        console.log(error);
        this.snackBar.open('your data not storing in database')._dismissAfter(2500);
      }
    );
  }
  showHideButton(){
      this.note_data = {
        // title : this.title.value,
        // content : this.content.value
      };
      // show data on console
      console.log(this.note_data);
      // if user enter note title or note description then add note
      if(this.note_data.title != null || this.note_data.content != null)
      {
        // post data on backend api
        this.noteService.addNote(this.note_data, this.token).subscribe(
          result =>{
            this.snackBar.open("Note successfully added", "close")
            ._dismissAfter(2500);
            //print the result on console
            console.log(result)
            // call ngOnInit() method
            this.ngOnInit();
          },
         err => {
           //print if error occur during add note data  in database
           console.log(err);
           this.snackBar.open('Error: your data not storing in database')._dismissAfter(2500);
         }
        );
        /*
          Resets the form control, marking it pristine and untouched, and setting the value to null.
        */
        //  this.title.reset();
        //  this.content.reset();
    }
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
    this.dialogRef.close();
  }

}
