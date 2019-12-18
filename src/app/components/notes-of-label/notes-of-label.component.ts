import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes-of-label',
  templateUrl: './notes-of-label.component.html',
  styleUrls: ['./notes-of-label.component.scss']
})
export class NotesOfLabelComponent implements OnInit, OnChanges {
  private notes: any;
  private token = localStorage.getItem('token');
  @Input() labelId: number;

  constructor(
    private noteservice: NoteServiceService,
    private activatedRoute: ActivatedRoute
    ) { }


  ngOnChanges() {
    this.notes = this.getLabelsNotes();
  }
  ngOnInit() {
      // this.activatedRoute.url.subscribe(res => {
      //   console.log(res);
      //   this.notes = this.getLabelsNotes();
      // },
      // err => {
      //   console.log('error');
      // });
  }

  getLabelsNotes() {
    console.log(this.labelId);
    this.noteservice.getLabelsNote(this.labelId, this.token).subscribe(
      result => {
        this.notes = result.data;
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
  }

  noteColor(color) {
    const style = {
      'background-color': color,
      'min-width': '215px'
    };
    return style;
  }
}
