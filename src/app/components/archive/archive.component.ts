import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { DataService } from 'src/app/service/data.service';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  public token: string;
  public data = {
    dataForUpdate: {},
    urlCridetial: Note
  };
  private archiveNotes;
  // private updateData;


  @Output() childmessage = new EventEmitter<any>();

  constructor(
    // private noteservice: NoteServiceService,
    private dataservice: DataService
    ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.dataservice.currentTrashNote.subscribe(notes => this.archiveNotes = notes);
    // console.log('Archive ngOnInit Called....')
    // this.noteservice.getArchiveNotes(localStorage.getItem('token')).subscribe(
    //   response => {
    //     this.archiveNotes = response.data;
    //     console.log('response: ', this.archiveNotes);
    //   },
    //   err => {
    //     this.archiveNotes = null;
    //     console.log('error: ', err);
    //   }
    // );
  }

  moveInTrash(note) {
    const newDetails = {
        is_trashed: true
      };

    this.data.dataForUpdate = newDetails;
    this.data.urlCridetial = note;
    this.childmessage.emit(this.data);

    // this.noteservice.updateNote(newDetails, note.id, localStorage.getItem('token')).subscribe(
    //     result => {
    //       console.log('This note is updated just now: -> ', result);
    //       this.updateData = result;
    //     },
    //     err => console.log('failed to load api' + err)
    //   );
  }


  unArchive(note) {
    const newDetails = {
      is_archive: false
    };
    this.data.dataForUpdate = newDetails;
    this.data.urlCridetial = note;
    this.childmessage.emit(this.data);
    // this.noteservice.updateNote(newDetails, note.id, localStorage.getItem('token')).subscribe(
    //   result => {
    //     console.log('This note is updated just now: -> ', result);
    //     this.updateData = result;
    //   },
    //   err => console.log('failed to load api' + err)
    // );
}
}
