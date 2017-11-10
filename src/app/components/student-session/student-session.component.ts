import { Component, OnInit } from '@angular/core';
import { UserTypeService } from 'app/services/user-type.service';

@Component({
  selector: 'app-student-session',
  templateUrl: './student-session.component.html',
  styleUrls: ['./student-session.component.scss'],
  providers: [UserTypeService]
})
export class StudentSessionComponent implements OnInit {

  constructor(private user: UserTypeService) { }

  ngOnInit() {
    this.user.userType = 'student';
  }

}
