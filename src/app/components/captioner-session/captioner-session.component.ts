import { SocketService } from './../../services/socket.service';
import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-captioner-session',
  templateUrl: './captioner-session.component.html',
  styleUrls: ['./captioner-session.component.scss'],
  providers: [UserTypeService, SocketService]
})
export class CaptionerSessionComponent implements OnInit {

  message: any;
  className: any;

  constructor(private user: UserTypeService, private socketService: SocketService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user.userType = 'captioner';
    this.className = this.route.snapshot.params['classID'];
    this.socketService.id = this.route.snapshot.params['classID'];
    this.socketService.connect(this.className);
  }


}
