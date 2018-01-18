import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transcripts',
  templateUrl: './transcripts.component.html',
  styleUrls: ['./transcripts.component.scss'],
  providers: [UserTypeService]
})
export class TranscriptsComponent implements OnInit {

  classes: any;
  classIDs = [];

  constructor(private user: UserTypeService) { }

  ngOnInit() {
    this.user.getClasses().subscribe(res => {
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

}
