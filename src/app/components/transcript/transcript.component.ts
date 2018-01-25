import { CaptionerUtilsService } from './../../services/captioner-utils.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from './../../services/socket.service';
import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss'],
  providers: [UserTypeService, SocketService, CaptionerUtilsService]
})
export class TranscriptComponent implements OnInit {

  constructor(private userInfo: UserTypeService, private socketService: SocketService, 
    private route: ActivatedRoute, private capUtil: CaptionerUtilsService) { }

  ngOnInit() {
    this.userInfo.userType = 'captioner';
    this.socketService.transcriptLoad = true;
    this.socketService.id = this.route.snapshot.params['id'];

  }

  // Method for updating the transcript title
  setTitle(title) {
    this.capUtil.updateTranscriptTitle(this.socketService.id, title).subscribe();
  }


}
