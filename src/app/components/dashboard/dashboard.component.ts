import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UserTypeService,]
})
export class DashboardComponent implements OnInit, OnDestroy {

  classSubs: Subscription;
  transcriptSub: Subscription;

  transSubFlag = false; // keep track if subscription is made
  classes: object;
  classIDs = [];
  transcriptID: string; // Hash value of transcript to be deleted
  listElem: any; // a reference to the list element to be removed

  constructor(private http: Http, private user: UserTypeService) { }

  ngOnInit() {
      this.classSubs = this.user.getClasses().subscribe(res => {
      this.classes = res;
      for (const elem of res){
        this.classIDs.push(elem._id); // store class IDs for reference in loadTranscripts().
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  // Load set of transcripts based on the id attribute.
  loadTranscripts($event) {
    this.transcriptSub = this.user.getTranscripts(this.classIDs[$event.currentTarget.id]).subscribe();
    this.transSubFlag = true;
  }

  // Deletes the transcript element visually and from the database
  deleteTranscript() {
    this.listElem.remove();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(`http://localhost:8080/api/transcripts/id/${this.transcriptID}`, {headers: headers})
    .map(res => res.json()).subscribe();
  }

  // helper method to store references to the transcriptID and list element (used for deleting transcript)
  storeID(id, $event) {
    this.transcriptID = id;
    this.listElem = $event.target.parentElement;
  }

  download() {
    // let blob = new Blob(["test"], { type: 'text/csv' });
    // saveAs(blob, "data.txt");

    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('responseType', 'text');
    return this.http.get(`http://localhost:8080/api/downloads/5a6c1fe4a31ca810d42f52b8`, {responseType: ResponseContentType.Blob})
    .map(res => new Blob([res.blob()], { type: 'application/rtf' })).subscribe(res => {
      saveAs(res, "thisWorks12.rtf");
    });
  }

  // Unsubscribe to the connections. (avoid memory leak)
  ngOnDestroy() {
    this.classSubs.unsubscribe();
    if (this.transSubFlag) {
      this.transcriptSub.unsubscribe();
    }
  }


}
