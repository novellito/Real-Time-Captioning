import { SocketService } from './../../services/socket.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {QuillEditorComponent} from 'ngx-quill/src/quill-editor.component';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// override p with div tag
import * as Quill from 'quill';
const  quill: any = Quill;
import {UserTypeService} from 'app/services/user-type.service';
const Parchment = quill.import('parchment');
const Block = Parchment.query('block');

Block.tagName   = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
quill.register(Block /* or NewBlock */, true);
// Add fonts to whitelist
const Font = quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'aref'];
quill.register(Font, true);

@Component({selector: 'app-editor', templateUrl: './editor.component.html', styleUrls: ['./editor.component.scss']})
export class EditorComponent implements OnInit {

  toolbarOptions: any;
  connection: any;
  constructor(private user: UserTypeService, private socketService: SocketService) {}

  /**
   * A life cycle hook for determining whether the user can
   * modify the text field and whether the editor contains a toolbar
   */
  ngOnInit() {
    if (this.user.userType === 'student') {
      this.toolbarOptions = false;
    } else {
      this.toolbarOptions = [
        [ 'bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{'size': ['small', false, 'large', 'huge']}]
      ];
    }
    quill.setContents([
      { insert: 'Hello ' },
      { insert: 'World!', attributes: { bold: true } },
      { insert: '\n' }
    ]);

    this.connection = this.socketService.getMessages().subscribe(message => {
      // this.messages.push(message);
    });
 
  }

  logChange($event: any) {
    console.log($event);

    this.socketService.sendMessage("reree");

    // this.socketService.getMessages();
;  }

}
