import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';

@Component({
  selector: 'app-collaborate',
  templateUrl: './collaborate.component.html',
  styleUrls: ['./collaborate.component.scss']
})
export class CollaborateComponent implements OnInit {
  private token = localStorage.getItem('token');
  private onenote;

  constructor(private noteservice: NoteServiceService) { }

  ngOnInit() {
    console.log('collaborate ngOnInit Called....');
    // this.noteservice.getNote(note_id, this.token).subscribe(
    //   response => { 
    //     this.onenote = response.data;
    //     console.log("trashed response: ", this.onenote) 
    //   },
    //   err => {
    //     this.onenote = null;
    //     console.log('error: ',err);
    //   }
    // );
  }

}
