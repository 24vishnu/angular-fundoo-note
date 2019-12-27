import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Note } from 'src/app/models/note';
import { Label } from 'src/app/models/label';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.scss'],
  providers: [DatePipe]
})
export class SearchNoteComponent implements OnInit {
  private token: string;
  private allLabels: Label[] = [];
  private datetimereminder = new Date(Date.now());

  private viewListGrid = false;

  @Input() getNotes: Note[];
  @Output() childmessage = new EventEmitter<any>();


  constructor(
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
  }

  changeList() {
    let style = {};
    if (this.viewListGrid) {
      style = {
        width: '100%',
        'flex-flow': 'column',
        'box-sizing': 'border-box',
        'flex-direction': 'column',
        'max-width': '100%'
      };
    } else if (window.innerWidth >= 600 && window.innerWidth < 900) {
      style = {
        'flex-flow': 'row',
        'box-sizing': 'border-box',
        'flex-direction': 'row',
        'max-width': '50%'
      };
    } else if (window.innerWidth >= 900) {
      style = {
        'flex-flow': 'row',
        'box-sizing': 'border-box',
        'flex-direction': 'row',
        'max-width': '33%'
      };
    }
    return style;
  }

  removeLable(note, labelToDelete) {
    let labelList = [...note.label];
    labelList = labelList.filter(label => label !== labelToDelete);
    console.log('remove this label', labelToDelete, labelList);
    const data = {
      dataForUpdate: { label: labelList },
      urlCridetial: note
    };
    this.childmessage.emit(data);
  }

  setReminder(note) {
    const data = {
      dataForUpdate: {reminder: this.datePipe.transform(this.datetimereminder.toISOString(), 'yyyy-MM-dd HH:mm:ss')},
      urlCridetial: note
    };
    this.childmessage.emit(data);
  }
}
