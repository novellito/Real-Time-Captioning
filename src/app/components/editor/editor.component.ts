import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {Component, OnInit, OnDestroy, ViewChild, Input} from '@angular/core';
import {QuillEditorComponent} from 'ngx-quill/src/quill-editor.component';
import { SocketService } from './../../services/socket.service';
import {UserTypeService} from 'app/services/user-type.service';

import * as Quill from 'quill';

const  quill: any = Quill;
const Parchment = quill.import('parchment');
const Block = Parchment.query('block');

Block.tagName   = 'DIV';
quill.register(Block /* or NewBlock */, true);
const Font = quill.import('formats/font');
Font.whitelist = ['mirza', 'aref'];
quill.register(Font, true);

@Component({selector: 'app-editor', templateUrl: './editor.component.html', styleUrls: ['./editor.component.scss']})
export class EditorComponent implements OnInit, OnDestroy {

  connection: Subscription;
  test: Subscription;
  editor: any;
  toolbarOptions: any;
  @Input() editStatus: boolean;
  userType = JSON.parse(localStorage.getItem('user')).role;

  constructor(private user: UserTypeService, private socketService: SocketService, private route: ActivatedRoute) {}

  /**
   * A life cycle hook for determining what the user can
   * see or access.
   */
  ngOnInit() {
    if (this.socketService.transcriptLoad) {

      if (this.editStatus) { // display edited transcript
        this.user.loadTranscript(this.socketService.id).subscribe(res => {
          this.user.transcriptTitle = res.transcriptName;
          this.editor.updateContents(res.modCaptions);
        });
      } else { // display original transcript
        this.user.loadTranscript(this.socketService.id).subscribe(res => {
        this.user.transcriptTitle = res.transcriptName;
        this.editor.updateContents(res.captions);
      });

      }
    }
    if (this.userType === 'student') {
      this.toolbarOptions = false;
        if(!this.route.snapshot.params['id']) {
          this.connection = this.socketService.getMessages().subscribe( (message: any) => {
            if (this.editor.getLength() === 1) {
              this.editor.updateContents(message.content);
            } else {
              this.editor.updateContents(message.currDel);
            }
          }
        );
      }

    } else {
      this.toolbarOptions = [
        [ 'bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{'size': ['small', false, 'large', 'huge']}]
      ];
    }

  }

  /**
   * This helper method hooks onto the current
   * editor in context.
   */
  grabRef($event) {
    this.editor = $event;
  }

   /**
   * Send the delta object to the students in the session
   * editor in context.
   */
  sendDelta($event: any) {
      if (this.userType === 'student' || $event.source === 'api') { // do nothing (prevent caption from bouncing back and forth)
        return;
      } else if ($event.source === 'user') { // only save if input comes from a user
        this.socketService.sendCaptions($event.delta, this.editor.getContents()).subscribe();
      }
 }

  // TODO: allow captioners & students to message one another
  // sendDM(message: any) {}

  ngOnDestroy() {
    if (JSON.parse(localStorage.getItem('user')).role === 'student' && this.connection) {
      this.connection.unsubscribe();
    }
  }
}
