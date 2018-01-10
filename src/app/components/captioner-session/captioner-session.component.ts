import { SocketService } from './../../services/socket.service';
import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaptionerUtilsService } from 'app/services/captioner-utils.service';


@Component({
  selector: 'app-captioner-session',
  templateUrl: './captioner-session.component.html',
  styleUrls: ['./captioner-session.component.scss'],
  providers: [UserTypeService, SocketService, CaptionerUtilsService]
})
export class CaptionerSessionComponent implements OnInit {

  message: any;
  className: any;
  id: any;

  constructor(private user: UserTypeService, private socketService:
    SocketService, private route: ActivatedRoute, private capUtil: CaptionerUtilsService) {}

  ngOnInit() {
    this.user.userType = 'captioner';
    this.className = this.route.snapshot.params['classID'];
    this.socketService.connect(this.className);

    this.capUtil.getClass(this.className).subscribe(res => {
      console.log(res[0]._id);
      this.capUtil.createTranscript(res[0]._id).subscribe(res2 => {
        console.log(res2);
        this.socketService.id = res2._id; // assign the hash id value of transcript
      });
    });

  }

  setTitle(title) {
    console.log(title);

  this.capUtil.updateTranscriptTitle(this.socketService.id, title).subscribe();
  }

}
