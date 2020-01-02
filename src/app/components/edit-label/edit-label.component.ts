import { Component, OnInit, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LabelService } from 'src/app/service/label.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataService } from 'src/app/service/data.service';
import { Label } from 'src/app/models/label';


@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {

  createNewLabel = {};
  private createlabel = new FormControl('');
  private token: string;
  private labelsList: Label[];
  private iconFlag: boolean;
  private labelUpdate: string;

  constructor(
    private labelService: LabelService,
    private dataservice: DataService,
    private matSnackBar: MatSnackBar,
    @Optional() private dialogRef: MatDialogRef<DashboardComponent>,
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.dataservice.getLabelNotes.subscribe(labels => this.labelsList = labels);

    // this.labels = this.getLabels();
  }

  chage_icon() {
    this.iconFlag = !this.iconFlag;
  }

  cleartext() {
    this.createNewLabel = '';
  }

  createOneLabel() {
    this.labelService.addLabel(this.createNewLabel, this.token).subscribe(
      result => {
        this.matSnackBar.open('label successfully added.', 'close')._dismissAfter(2000);
        this.labelsList.push(result.data);
        this.createlabel.reset();
      },
      err => {
        alert('Error to add label');
        console.log(err);
      }
    );
  }
  deleteLabel(labelId) {
    this.labelService.deleteLabel(labelId, this.token).subscribe(
      result => {
        this.matSnackBar.open('label successfully deleted.', 'close')._dismissAfter(2000);
        this.createlabel.reset();
      },
      err => {
        alert('Error label updation failed');
        this.matSnackBar.open('Error label updation failed.', 'close')._dismissAfter(2000);
        console.log(err);
      }
    );
  }
  updateLabel(label) {
    this.labelService.updateLabel({name: label.name}, label.id, this.token).subscribe(
      result => {
        this.matSnackBar.open('label successfully added.', 'close')._dismissAfter(2000);
        this.labelsList =  this.labelsList.filter(onelabel => onelabel.id !== result.data.id);
      },
      err => {
        alert('Error label updation failed');
        this.matSnackBar.open('Error label updation failed.', 'close')._dismissAfter(2000);
        console.log(err);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
