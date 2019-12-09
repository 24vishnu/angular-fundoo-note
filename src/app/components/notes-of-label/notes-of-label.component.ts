import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';

@Component({
  selector: 'app-notes-of-label',
  templateUrl: './notes-of-label.component.html',
  styleUrls: ['./notes-of-label.component.scss']
})
export class NotesOfLabelComponent implements OnInit {
  private notes: any;
  private token = localStorage.getItem('token');

  constructor(private noteservice: NoteServiceService) { }

  ngOnInit() {
    this.notes = this.getLabelsNotes(2);
  }

  getLabelsNotes(label_id){
    this.noteservice.getLabelsNote(label_id, this.token).subscribe(
      result => {
        this.notes = result.data;
        console.log(result)
      },
      err => {
        console.log(err);
      }
    );
  }

  noteColor(color){
    let style={
      'background-color': color
    };
    return style;
  }
}
