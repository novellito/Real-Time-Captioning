import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
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

  editor: any;
  connection: any;
  toolbarOptions: any;

  constructor(private user: UserTypeService, private socketService: SocketService) {}

  /**
   * A life cycle hook for determining what the user can
   * see or access.
   */
  ngOnInit() {
    if (this.socketService.transcriptLoad) {
      this.user.loadTranscript(this.socketService.id).subscribe(res => {
        console.log(res.transcriptName)
        this.user.transcriptTitle = res.transcriptName;
        this.editor.updateContents(res.captions);
      });
    }
    if (this.user.userType === 'student') {
      this.toolbarOptions = false;

      this.connection = this.socketService.getMessages().subscribe( (message: any) => {
            if (this.editor.getLength() === 1) {
              this.editor.updateContents(message.content);
            } else {
              this.editor.updateContents(message.currDel);
            }
        }
      );


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

      if (this.user.userType === 'student') { // do nothing (prevent caption from bouncing back and forth)
        return;
      }
      this.socketService.sendCaptions($event.delta, this.editor.getContents()).subscribe();
 }

  // TODO: allow captioners & students to message one another
  // sendDM(message: any) {}

  ngOnDestroy() {
    if (this.user.userType === 'student') {
      this.connection.unsubscribe();
    }
  }
}
