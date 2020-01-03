import { Component, OnInit, Optional } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatDialogRef } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.scss']
})
export class ChangeProfilePictureComponent implements OnInit {
  private token: string;
  private newImage: any;
  private imageChangedEvent: any = '';
  private croppedImage: any = '';

  constructor(
    private userservice: UserService,
    @Optional() public dialogRef: MatDialogRef<ChangeProfilePictureComponent>,
    ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
  }
  onFileSelected(event: ImageCroppedEvent) {
    this.imageChangedEvent = event;
  }

 dataURItoBlob(dataURI, type) {
    // convert base64 to raw binary data held in a string
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const rawBuffer = new ArrayBuffer(byteString.length);
    const unsigned8BitValue = new Uint8Array(rawBuffer);
    for (let i = 0; i < byteString.length; i++) {
      unsigned8BitValue[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    const blobFile = new Blob([rawBuffer], { type: type});
    return blobFile;
}

  imageCropped(event: ImageCroppedEvent) {
    // preview image
    this.croppedImage = event.base64;
    // converting for upload
    const fileBeforCrop = this.imageChangedEvent.target.files[0];

    // converting base64 to Blob format for upload
    this.newImage = this.dataURItoBlob(this.croppedImage, 'image/png');
    this.newImage.name = fileBeforCrop.name;
  }



  changeProfile() {
    const uploadData = new FormData();
    uploadData.append('image', this.newImage, this.newImage.name);
    this.userservice.setProfilePic(uploadData, this.token).subscribe(
      result => {
        this.dialogRef.close(result.data);
      },
      err => {
        this.dialogRef.close(err);
        console.log('failed to load labels' + err);
      }
    );
  }
}
