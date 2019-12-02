import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {
  private show_note_content = true;
  private note_data: any;
  private title = new FormControl();
  private content = new FormControl();
  private token = localStorage.getItem("token");
  
  constructor(private noteService: NoteServiceService, private snackBar: MatSnackBar) { }

  /*
    A callback method that is invoked immediately after the default change 
    detector has checked the directive's data-bound properties for the first
    time, and before any of the view or content children have been checked.
    It is invoked only once when the directive is instantiated.
  */
  ngOnInit() {
  }

  showHideButton(){
    this.show_note_content = this.show_note_content ? false : true;
    if(this.show_note_content){
      this.note_data = {
        title : this.title.value,
        content : this.content.value
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
         this.title.reset();
         this.content.reset();
      }
    }
  }
}
