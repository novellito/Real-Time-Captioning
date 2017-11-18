import { StudentInfoService } from './../../services/student-info.service';
import { Component, OnInit } from '@angular/core';
import { SocketService } from './../../services/socket.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [StudentInfoService, SocketService]
})
export class DashboardComponent implements OnInit {

  classes: any;
  // sessionStatus = false;

  constructor(private studentInfo: StudentInfoService, private socketService: SocketService) { }

  ngOnInit() {
    this.classes = this.studentInfo.getClasses();
    console.log("reee");
    this.socketService.sessionStatus.subscribe(
      (sessionStat) =>  console.log(sessionStat)
    );

  }



}
