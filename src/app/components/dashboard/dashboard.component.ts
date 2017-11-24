import { StudentInfoService } from './../../services/student-info.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [StudentInfoService]
})
export class DashboardComponent implements OnInit {

  classes: any;
  transcripts: any;

  constructor(private http: Http, private studentInfo: StudentInfoService) { }

  ngOnInit() {
    this.studentInfo.getClasses().subscribe(res => {
      // console.log(res);
      this.classes = res;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  loadTranscripts($event){
    console.log($event.currentTarget.id);
 
      // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // return this.http.get(`http://localhost:8080/api/transcripts/id/${this.id}`, { headers: headers })
    // .map(res => res.json());
  }

}
