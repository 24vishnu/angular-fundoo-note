import { Component, OnInit, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LabelService } from 'src/app/service/label.service';
import { MatSnackBar } from '@angular/material/snack-bar';  
import { MatDialogRef } from '@angular/material/dialog'
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {

  createlabel1 = {};
  private createlabel = new FormControl('');
  private token = localStorage.getItem('token');
  // private labels;
  private labelsList: any;
  private iconFlag:boolean;

  constructor(
    private labelService: LabelService,
    private dataservice: DataService,
    private matSnackBar: MatSnackBar,
    @Optional() private dialogRef: MatDialogRef<DashboardComponent>,
  ) { }

  ngOnInit() {
    this.dataservice.currentLabels.subscribe(labels => this.labelsList = labels); 

    // this.labels = this.getLabels();
  }

  chage_icon(){
    this.iconFlag = !this.iconFlag
  }

  cleartext() {
    this.createlabel1='';
  }

  createLabelMethod() {
    console.log('data from html',this.createlabel1);
    this.labelService.addLabel(this.createlabel1, this.token).subscribe(
      result => {
        this.matSnackBar.open('label successfully added.', 'close')._dismissAfter(2000);
        console.log('in create label method1: ',result);
        console.log('in create label method2: ',this.labelsList)
        this.labelsList.push(result.data);
        console.log('in create label method3: ',this.labelsList)
        this.createlabel.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  closeDialog() {
    console.log('during initial close dialog: ',this.labelsList)
    this.dialogRef.close();
  }

}
