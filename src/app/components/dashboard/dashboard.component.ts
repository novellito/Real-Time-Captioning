import { StudentInfoService } from './../../services/student-info.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [StudentInfoService]
})
export class DashboardComponent implements OnInit {

  classes: any;

  constructor(private studentInfo: StudentInfoService) { }

  ngOnInit() {
    this.classes = this.studentInfo.getClasses();
  }

}
