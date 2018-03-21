import { AuthService } from './services/auth.service';
import { TranscriptComponent } from './components/transcript/transcript.component';
import { StatusComponent } from './components/status/status.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditorComponent } from './components/editor/editor.component';
import { QuillModule } from 'ngx-quill';
import { LandingComponent } from './components/landing/landing.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentSessionComponent } from './components/student-session/student-session.component';
import { CaptionerSessionComponent } from './components/captioner-session/captioner-session.component';
import { TranscriptsComponent } from './components/transcripts/transcripts.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TypingAnimationDirective } from 'angular-typing-animation';
import { LoginComponent } from './components/login/login.component'
import { AuthGuard } from './guards/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'student-session/:className/:classID', component: StudentSessionComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'captioner-session/:classID/:transcriptID', component: CaptionerSessionComponent },
  { path: 'transcripts', component: TranscriptsComponent },
  { path: 'captioner-session/:classID', component: CaptionerSessionComponent },
  { path: 'transcript/:id', component: TranscriptComponent },
  { path: 'transcript/:modified/:id', component: TranscriptComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    ButtonComponent,
    HeaderComponent,
    NavbarComponent,
    EditorComponent,
    StatusComponent,
    DashboardComponent,
    LandingComponent,
    StudentSessionComponent,
    CaptionerSessionComponent,
    TranscriptsComponent,
    SettingsComponent,
    TranscriptComponent,
    TypingAnimationDirective,
    LoginComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    QuillModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
