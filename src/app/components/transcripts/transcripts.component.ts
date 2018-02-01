import { Http, Headers } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-transcripts',
  templateUrl: './transcripts.component.html',
  styleUrls: ['./transcripts.component.scss'],
  providers: [UserTypeService]
})
export class TranscriptsComponent implements OnInit, OnDestroy {

  classSubs: Subscription;
  transcriptSub: Subscription;

  transSubFlag = false; // keep track if subscription is made
  classes: object;
  classIDs = [];

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

  // Unsubscribe to the connections. (avoid memory leak)
  ngOnDestroy() {
    this.classSubs.unsubscribe();
    if (this.transSubFlag) {
      this.transcriptSub.unsubscribe();
    }
  }

}
