import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCardModule,
   MatSnackBarModule, MatFormFieldModule, MatMenuModule, MatToolbarModule, MatListModule,
   MatDialogModule, MatSidenavModule, MatTooltipModule, MatGridListModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { UserService } from './service/user.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditLabelComponent } from './components/edit-label/edit-label.component';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { ViewnoteComponent } from './components/viewnote/viewnote.component';
import { CollaborateComponent } from './components/collaborate/collaborate.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { TrashComponent } from './components/trash/trash.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeProfilePictureComponent } from './components/change-profile-picture/change-profile-picture.component';
import { NotesOfLabelComponent } from './components/notes-of-label/notes-of-label.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    EditLabelComponent,
    AddnoteComponent,
    ViewnoteComponent,
    CollaborateComponent,
    RemindersComponent,
    TrashComponent,
    ArchiveComponent,
    EditNoteComponent,
    ChangeProfilePictureComponent,
    NotesOfLabelComponent,
  ],
  entryComponents: [
    EditLabelComponent,
    EditNoteComponent,
    ChangeProfilePictureComponent
    ],

  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    OverlayModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    MatGridListModule,
    DragDropModule,
    ImageCropperModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
