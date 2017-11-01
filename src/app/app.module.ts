import { StatusComponent } from './components/status/status.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { QuillModule } from 'ngx-quill';


// import { StatusComponent } from './components/status/status.component';
import { SocketioComponent } from './components/socketio/socketio.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    SocketioComponent,
    StatusComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    QuillModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
