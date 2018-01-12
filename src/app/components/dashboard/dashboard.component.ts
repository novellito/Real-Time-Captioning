import { UserTypeService } from './../../services/user-type.service';
import { StudentInfoService } from './../../services/student-info.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [StudentInfoService, UserTypeService]
})
export class DashboardComponent implements OnInit {

  classes: any;
  classIDs = [];

  constructor(private http: Http, private studentInfo: StudentInfoService, private user: UserTypeService) { }

  ngOnInit() {
    this.studentInfo.getClasses().subscribe(res => {
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

  loadTranscripts($event) {
    const id = this.classIDs[$event.currentTarget.id];
    this.studentInfo.getTranscripts(id).subscribe();
  }



}
