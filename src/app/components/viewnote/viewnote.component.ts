import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/note-service.service';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatDialog } from '@angular/material';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.scss']
})
export class ViewnoteComponent implements OnInit, AfterViewInit {
  private updated_data;
  private token = localStorage.getItem('token');
  private getNote: any;
  grid_list_view = false;
  @Input() viewListGrid: boolean;


  constructor(
    private noteService: NoteServiceService,
    public dialog: MatDialog,
    private dataservice: DataService 
     ) { 
  }
  
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.getNote, event.previousIndex, event.currentIndex);
  }
   ngAfterViewInit(){
    console.log("in View coponent after init: ", this.getNote);
   }

  ngOnInit() {  
    this.dataservice.currentMessage.subscribe(notes => this.getNote = notes);  
    console.log("in View coponent init: ", this.getNote);
  }

  moveTrash(note_id){
    console.log(note_id);
    let new_details = {
      'is_trashed': true
    };
    this.noteService.updateNote(new_details, note_id, this.token).subscribe(
      result => {
        console.log('This note is updated just now: -> ',result);
        this.updated_data = result;
        
        this.getNote =  this.getNote.filter(note => note.note.id !== note_id);        
      },
      err => console.log('failed to load api' + err)
    );
  }

  chageList(){
    if(this.viewListGrid){
    let style = {
      'width': '100%',
      'flex-direction': 'column'
    };
    return style;
  }
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

        this.getNote =  this.getNote.filter(note => note.note.id !== note_id);        
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
        console.log(this.updated_data)
        for(let note of this.getNote){
          if(note.note.id == note_id){
            note.note = this.updated_data.data
          }
        }
        // console.log('after check : ',this.getNote)
        // this.dataservice.changeMessage(this.getNote)
      },
      err => console.log('failed to load api' + err)
    );
  }
  openDialog(note) {
    const dialogRef = this.dialog.open(EditNoteComponent, 
      {
        panelClass: 'one-note-dialog',
        height: 'auto',
        width: '50%',
        data: note,
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.updateNote(note.id);
      console.log(`The dialog was closed and result is ${(result)}`);
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

