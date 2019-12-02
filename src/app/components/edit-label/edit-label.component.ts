import { Component, OnInit, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LabelService } from 'src/app/service/label.service';
import { MatSnackBar } from '@angular/material/snack-bar';  
import { MatDialogRef } from '@angular/material/dialog'
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {

  createlabel1 = {};
  private createlabel = new FormControl('');
  private token = localStorage.getItem('token');
  private labels;

  constructor(
    private labelService: LabelService,
    private matSnackBar: MatSnackBar,
    @Optional() private dialogRef: MatDialogRef<DashboardComponent>,
  ) { }

  ngOnInit() {
    this.labels = this.getLabels();
  }

  cleartext() {
    this.createlabel1='';
  }

  createLabelMethod() {
    console.log('data from html',this.createlabel1);
    this.labelService.addLabel(this.createlabel1, this.token).subscribe(
      result => {
        this.matSnackBar.open('label successfully added.', 'close')._dismissAfter(2000);
        console.log(result);
        this.getLabels();
        this.createlabel.reset();
      },
      err => {
        console.log(err);
      }
    );
  }
  getLabels() {
    this.labelService.getLabels(this.token).subscribe(
      res => {
        this.labels = res.data;
        console.log('getLable function: ', this.labels);
      },
      err => console.log(err)
    );
  }

  closeDialog() {
    console.log(this.labels)
    this.dialogRef.close();
  }

}
