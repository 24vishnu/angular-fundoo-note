import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.scss']
})
export class ChangeProfilePictureComponent implements OnInit {
  token = localStorage.getItem('token');
  new_image: any;
  constructor(private userservice: UserService) { }

  ngOnInit() {
  }
  onFileSelected(event){
    console.log(event.target.files)
    this.new_image = event.target.files[0];
  }
  changeProfile(){
   const new_image_data = {
      'image': this.new_image.name
    }
    // const form_data =  new FormData();
    // form_data.append('image', this.new_image,this.onFileSelected.name);
    console.log(new_image_data, this.new_image.name);
    this.userservice.setProfilePic(new_image_data, this.token).subscribe(
      result => {
        console.log(result);
      },
      err => console.log('failed to load labels' + err)

    );
  }
}
