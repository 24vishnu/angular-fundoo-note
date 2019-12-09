import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {
  private show_note_content = true;
  private note_data: any;
  private all_note: any;
  private title = new FormControl();
  private content = new FormControl();
  private token = localStorage.getItem("token");
  
  constructor(
    private noteService: NoteServiceService, 
    private snackBar: MatSnackBar,
    private dataservice: DataService
    ) { }

  /*
    A callback method that is invoked immediately after the default change 
    detector has checked the directive's data-bound properties for the first
    time, and before any of the view or content children have been checked.
    It is invoked only once when the directive is instantiated.
  */
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(notes => this.all_note = notes);  
  }

  showHideButton(){
    this.show_note_content = this.show_note_content ? false : true;
    if(this.show_note_content){
      this.note_data = {
        title : this.title.value,
        content : this.content.value,
      };
      // show data on console
      console.log(this.note_data);
      // if user enter note title or note description then add note
      if(this.note_data.title != null || this.note_data.content != null)
      {
        // console.log(this.all_note);
        // console.log(this.note_data);
        // this.all_note.push({'note':this.note_data});
        // this.dataservice.changeMessage(this.all_note)
      
        // post data on backend api
        this.noteService.addNote(this.note_data, this.token).subscribe(
          result =>{
            this.snackBar.open("Note successfully added", "close")
            ._dismissAfter(2500);
            //print the result on console
            console.log(result)
            this.all_note.push({'note':result.data});
            this.dataservice.changeMessage(this.all_note);
            console.log("After update data is :", this.all_note)
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
