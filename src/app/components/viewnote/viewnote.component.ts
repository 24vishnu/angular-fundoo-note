import { Component, OnInit, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.scss']
})
export class ViewnoteComponent implements OnInit {
  private updated_data;
  private token = localStorage.getItem('token');
  private getNote = [];
  grid_list_view = false;
  // private dialog: MatDialog;

  constructor(private noteService: NoteServiceService, public dialog: MatDialog) { 
  }
  // @Input() getNote: [];

  ngOnInit() {
    
    this.noteService.getNotes(this.token).subscribe(
      response => {
        
        this.getNote = response.data;
        console.log('This is response :', this.getNote);
      },
      err => {
        this.getNote = null;
        console.log(err);

      }
    );
  }

  chageList(){
    if(this.grid_list_view){
    let style = {
      'width': '100%',
      'flex-direction': 'column'
    };
    return style;
  }
  }
  clickChageView(){
    this.grid_list_view = !this.grid_list_view;
  }
  noteColor(color){
      let style={
        'background-color': color
      };
      return style;
  }
        
  archiveNote(note_id){
    let new_details = {
      'is_archive': true
    };
    this.noteService.updateNote(new_details, note_id, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ',result);
        this.updated_data = result;
      },
      err => console.log('failed to load api' + err)
    );
  }

  changeColor(note_id, color){
    let new_details = {
      'change_color': color
    };
    console.log(color);
    this.noteService.updateNote(new_details, note_id, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ',result);
        this.updated_data = result;
      },
      err => console.log('failed to load api' + err)
    );
  }
  openDialog(note) {
    console.log(note);
    const dialogRef = this.dialog.open(EditNoteComponent, 
      {
        height: 'auto',
        width: '60%',
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      // this.updateNote(note.id);
      console.log(`The dialog was closed: ${this.getNote}`);
    });
  }



  updateNote(note_id){
    let new_details = {
      'title': true,
      'content': true
    };
    this.noteService.updateNote(new_details, note_id, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ',result);
        this.updated_data = result;
      },
      err => console.log('failed to load api' + err)
    );
  }
}

