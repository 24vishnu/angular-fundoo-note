import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  token= localStorage.getItem('token');
  private trashed_notes;
  private deleted_note;
  private updated_data;
  change_list = false;

  constructor(private noteservice: NoteServiceService) { }

  ngOnInit() {
    // console.log('Trash ngOnInit Called....');
    this.noteservice.getTrashedNotes(this.token).subscribe(
      response => { 
        this.trashed_notes = response.data;
        console.log("trashed response: ", this.trashed_notes) 
      },
      err => {
        this.trashed_notes = null;
        console.log('error: ',err);
      }
    );
  }
  setStyle(){
    let style = {
    'width': this.change_list ? '100%': 'normal',
    'flex-direction': this.change_list ? 'column':'row'
    };
    return style;
  }

  delete(note_id){
    // console.log("TOKEN : -> ",localStorage.getItem('token'))
    // console.log(note_id);
    this.noteservice.deleteNote(note_id, this.token).subscribe(
      result => {
        console.log('This note is deleted: -> ',result.data);
        this.deleted_note = result.data;
      },
      err => console.log('failed to load api' + err)
    );
  }
  restoreNote(note_id){
    let new_details = {
      'is_trashed': false
    };
    // console.log('This is new content to update: ',new_details);
    // console.log('This is new note id: ', note_id);
    // console.log("TOKEN : -> ",localStorage.getItem('token'));

    this.noteservice.updateNote(new_details, note_id, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ',result);
        this.updated_data = result;
      },
      err => console.log('failed to load api' + err)
    );
  }
}
