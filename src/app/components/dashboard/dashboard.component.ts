import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LabelService } from 'src/app/service/label.service';
import { EditLabelComponent } from '../edit-label/edit-label.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username = 'Vishnu Kumar';
  email = 'vishnu23kumar@gmail.com';
  token = localStorage.getItem('userIdToken');
  private links;

  showNoteContent = true;

  constructor(private router: Router, private labelService: LabelService, private dialog: MatDialog) { }


  ngOnInit() {
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
    this.getLabel();
  }
  getLabel() {
    console.log("TOKEN : -> ",localStorage.getItem('userIdToken'))
    console.log("TOKEN : -> 'userIdToken'")
    this.labelService.getLabels(this.token).subscribe(
      result => {
        this.links = result.data;
        console.log(this.links)
      },
      err => console.log('failed to load labels' + err)

    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      data: this.links
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getLabel();
    });
  }
  signout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}