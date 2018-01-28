import { Http, Headers, ResponseContentType } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-transcripts',
  templateUrl: './transcripts.component.html',
  styleUrls: ['./transcripts.component.scss'],
  providers: [UserTypeService]
})
export class TranscriptsComponent implements OnInit, OnDestroy {

  classes: any;
  classIDs = [];
  transcriptSub: Subscription;
  classSubs: Subscription;

  transSubFlag = false; // keep track if subscription is made
  listElem: any; // a reference to the list element to be removed
  transcriptID: string; // Hash value of transcript to be deleted


  constructor(private user: UserTypeService, private http: Http) { }

  ngOnInit() {
    this.classSubs = this.user.getClasses().subscribe(res => {
      this.classes = res;
      for (const elem of res){
        this.classIDs.push(elem._id); // store class IDs for reference in loadTranscripts().
      }
      console.log(this.classIDs);
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

  // download the transcript file
  download(name, id) {
    return this.http.get(`http://localhost:8080/api/downloads/${id}`, {responseType: ResponseContentType.Blob})
    .map(res => new Blob([res.blob()], { type: 'application/rtf' })).subscribe(res => {
      saveAs(res, `${name}.rtf`);
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
