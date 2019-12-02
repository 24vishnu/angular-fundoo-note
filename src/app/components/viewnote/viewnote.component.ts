import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.scss']
})
export class ViewnoteComponent implements OnInit {

  private token = localStorage.getItem('token');

  private getNote = [];

  constructor(private noteService: NoteServiceService) { }

  ngOnInit() {
    this.noteService.getNotes(this.token).subscribe(
      response => {
        
        // this.getNote = response.data;
        var aa;
        for(var propName in response.data) {
          aa = response.data[propName]
          this.getNote.push(Object.values(aa));
      }
        console.log('This is response :', this.getNote);
      },
      err => {
        this.getNote = null;
        console.log(err);

      }
    );
  }
}
