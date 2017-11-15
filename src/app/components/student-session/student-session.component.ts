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

  messages = [];
  connection: any;
  constructor(private user: UserTypeService, private socketService: SocketService) { }

  ngOnInit() {
    this.user.userType = 'student';
    this.connection = this.socketService.getMessages().subscribe(message => {
    this.messages.push(message);
    });
    console.log(this.messages);

    console.log(JSON.stringify(this.socketService.getMessages()));
    
  }

  getDelta(){
    console.log("test");
  }



}
