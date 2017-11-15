import { SocketService } from './../../services/socket.service';
import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-captioner-session',
  templateUrl: './captioner-session.component.html',
  styleUrls: ['./captioner-session.component.scss'],
  providers: [UserTypeService, SocketService]
})
export class CaptionerSessionComponent implements OnInit {

  message: any;

  constructor(private user: UserTypeService, private socketService: SocketService) { }

  ngOnInit() {
    this.user.userType = 'captioner';
  }

  sendMessage(){
    this.socketService.sendMessage(this.message);
    this.message = '';
  }


}
