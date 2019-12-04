import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  private token = localStorage.getItem('token');
  private archiveNotes;

  constructor(private noteservice: NoteServiceService) { }

  ngOnInit() {
    console.log('Archive ngOnInit Called....')
    this.noteservice.getArchiveNotes(this.token).subscribe(
      response => { 
        this.archiveNotes = response.data;
        console.log("response: ", this.archiveNotes) 
      },
      err => {
        this.archiveNotes = null;
        console.log('error: ',err);
      }
    );
  }
}
