import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.scss']
})
export class ViewnoteComponent implements OnInit {

  private token = localStorage.getItem('token');
  private updated_data;
  private getNote = [];
  grid_list_view = false;

  constructor(private noteService: NoteServiceService) { }

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
    console.log('This is new content to update: ',new_details);
    console.log('This is new note id: ', note_id);
    console.log('this is authrization token : ', this.token);

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
}

