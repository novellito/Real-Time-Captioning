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

  connection: any;
  caption: any;
  constructor(private user: UserTypeService, private socketService: SocketService) { }


  //use Observable to listen for changes?
  ngOnInit() {
    this.user.userType = 'student';
    this.connection = this.socketService.getMessages().subscribe(message => {
    // this.messages.push(message);
    console.log(message);
    this.caption = message;
    });
    // this.socketService.connect();


  }



}
