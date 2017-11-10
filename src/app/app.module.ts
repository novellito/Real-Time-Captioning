import { StatusComponent } from './components/status/status.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditorComponent } from './components/editor/editor.component';
import { QuillModule } from 'ngx-quill';
import { LandingComponent } from './components/landing/landing.component';


import { SocketioComponent } from './components/socketio/socketio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentSessionComponent } from './components/student-session/student-session.component';
import { CaptionerSessionComponent } from './components/captioner-session/captioner-session.component';

const appRoutes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'student-session', component: StudentSessionComponent},
  {path: 'captioner-session', component: CaptionerSessionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    ButtonComponent,
    HeaderComponent,
    SocketioComponent,
    NavbarComponent,
    EditorComponent,
    StatusComponent,
    DashboardComponent,
    LandingComponent,
    StudentSessionComponent,
    CaptionerSessionComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    QuillModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
