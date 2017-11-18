import { StudentInfoService } from './../../services/student-info.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transcripts',
  templateUrl: './transcripts.component.html',
  styleUrls: ['./transcripts.component.scss'],
  providers: [StudentInfoService]  
})
export class TranscriptsComponent implements OnInit {

  classes: any;

  constructor(private studentInfo: StudentInfoService) { }

  ngOnInit() {
    this.classes = this.studentInfo.getClasses();
  }

}
