import { SocketService } from './../../services/socket.service';
import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaptionerUtilsService } from 'app/services/captioner-utils.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-captioner-session',
  host: {
    '(window:keydown)': 'hotkeys($event)'
  },
  templateUrl: './captioner-session.component.html',
  styleUrls: ['./captioner-session.component.scss'],
  providers: [UserTypeService, SocketService, CaptionerUtilsService]
})
export class CaptionerSessionComponent implements OnInit, OnDestroy {
  classSubs: Subscription;
  transcriptSub: Subscription;
  titleSub: Subscription;
  paramsSub: Subscription;

  showHide = false;
  titleSubFlag = false;
  courseID;

  constructor(
    private user: UserTypeService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private capUtil: CaptionerUtilsService
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.courseID = params['classID'];
      this.socketService.connect(this.courseID);
      this.classSubs = this.capUtil.getClass(this.courseID).subscribe(res => {
        // get current class info to access hash id for the class
        this.transcriptSub = this.capUtil
          .createTranscript(res[0]._id)
          .subscribe(res2 => {
            this.socketService.id = res2._id; // assign the hash id value of transcript
          });
      });
    });
  }

  // Method for updating the transcripts title
  setTitle(title) {
    this.titleSub = this.capUtil
      .updateTranscriptTitle(this.socketService.id, title)
      .subscribe();
    this.titleSubFlag = true;
  }

  // Unsubscribe to the connections. (avoid memory leak)
  ngOnDestroy() {
    this.classSubs.unsubscribe();
    this.paramsSub.unsubscribe();
    if (this.titleSubFlag) {
      this.titleSub.unsubscribe();
    }
  }

  hotkeys(event) {
    if (event.keyCode == 81 && event.ctrlKey) {
      this.showHide = !this.showHide;
    }
  }
}
