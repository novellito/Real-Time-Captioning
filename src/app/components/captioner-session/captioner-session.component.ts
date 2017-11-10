import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-captioner-session',
  templateUrl: './captioner-session.component.html',
  styleUrls: ['./captioner-session.component.scss'],
  providers: [UserTypeService]
})
export class CaptionerSessionComponent implements OnInit {

  constructor(private user: UserTypeService) { }

  ngOnInit() {
    this.user.userType = 'captioner';
  }

}
