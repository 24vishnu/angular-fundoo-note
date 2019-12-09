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
  private update_data;

  constructor(private noteservice: NoteServiceService) { }

  ngOnInit() {
    // console.log('Archive ngOnInit Called....')
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

  moveInTrash(note_id){  
    console.log(note_id)  
      let new_details = {
        'is_trashed': true
      };  
      this.noteservice.updateNote(new_details, note_id, this.token).subscribe(
        result => {
          console.log('This note is updated just now: -> ',result);
          this.update_data = result;
        },
        err => console.log('failed to load api' + err)
      );
  }
  unArchive(note_id){    
    let new_details = {
      'is_archive': false
    };  
    this.noteservice.updateNote(new_details, note_id, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ',result);
        this.update_data = result;
      },
      err => console.log('failed to load api' + err)
    );
}
}
