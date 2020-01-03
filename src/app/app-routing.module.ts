import { NgModule } from '@angular/core';
import { Route, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ViewnoteComponent } from './components/viewnote/viewnote.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { NotesOfLabelComponent } from './components/notes-of-label/notes-of-label.component';
import { SearchNoteComponent } from './components/search-note/search-note.component';


const routes: Route[] = [
  // {path: '', component: SearchNoteComponent},
  {path: 'signup', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService],
  children: [
    {path: '', component: ViewnoteComponent},
    {path: 'home', component: ViewnoteComponent},
    {path: 'reminder', component: RemindersComponent},
    {path: 'archive', component: ArchiveComponent},
    {path: 'trash', component: TrashComponent},
    {path: 'search', component: SearchNoteComponent},
    {path: 'label/:name', component: NotesOfLabelComponent}
  ]
  },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
