import { Observable } from 'rxjs/Observable';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { UserTypeService } from 'app/services/user-type.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-session',
  templateUrl: './student-session.component.html',
  styleUrls: ['./student-session.component.scss'],
  providers: [UserTypeService, SocketService]
})
export class StudentSessionComponent implements OnInit {

  className: any;
  classID: any;

  constructor(private user: UserTypeService, private route: ActivatedRoute,
     private socketService: SocketService) { }

  ngOnInit() {
    // this.user.userType = 'student';
    this.className = this.route.snapshot.params['className'];
    this.classID = this.route.snapshot.params['classID'];

    this.socketService.id = this.route.snapshot.params['classID'];
    this.socketService.connect(this.classID);
  }


}
