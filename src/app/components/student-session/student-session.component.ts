import { Observable } from 'rxjs/Observable';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { UserTypeService } from 'app/services/user-type.service';

@Component({
  selector: 'app-student-session',
  templateUrl: './student-session.component.html',
  styleUrls: ['./student-session.component.scss'],
  providers: [UserTypeService, SocketService]
})
export class StudentSessionComponent implements OnInit {

  constructor(private user: UserTypeService, private socketService: SocketService) { }

  ngOnInit() {
    this.user.userType = 'student';
  }


}
