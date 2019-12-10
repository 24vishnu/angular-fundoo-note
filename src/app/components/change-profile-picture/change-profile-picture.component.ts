import { Component, OnInit, Optional } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatDialogRef } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.scss']
})
export class ChangeProfilePictureComponent implements OnInit {
  token = localStorage.getItem('token');
  new_image: any;
  constructor(
    private userservice: UserService,
    @Optional() public dialogRef: MatDialogRef<ChangeProfilePictureComponent>,
    ) { }

  ngOnInit() {
  }
  onFileSelected(event){
    console.log(event.target.files)
    this.new_image = event.target.files[0];
  }
  changeProfile(){
  //  const new_image_data = {
  //     'image': this.new_image.name
  //   }
    const uploadData = new FormData();
    uploadData.append('image  ', this.new_image, this.new_image.name);
    console.log(this.new_image);
    console.log(this.new_image.name);

    this.userservice.setProfilePic(uploadData, this.token).subscribe(
      result => {
        console.log(result);   
          this.dialogRef.close(result.data);

      },
      err => console.log('failed to load labels' + err)

    );
  }
}
