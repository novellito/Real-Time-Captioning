import {Component, OnInit, ViewChild} from '@angular/core';
import {QuillEditorComponent} from 'ngx-quill/src/quill-editor.component';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// override p with div tag
import Quill from 'quill';
import {UserTypeService} from 'app/services/user-type.service';
const Parchment = Quill.import ('parchment');
const Block     = Parchment.query('block');

Block.tagName   = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
Quill.register(Block, true);
const Font = Quill.import ('formats/font');
Font.whitelist = ['mirza', 'aref'];
Quill.register(Font, true);

@Component({selector: 'app-editor', templateUrl: './editor.component.html', styleUrls: ['./editor.component.scss']})
export class EditorComponent implements OnInit {

  toolbarOptions: any;

  constructor(private user: UserTypeService) {}

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
  }

  logChange($event: any) {
    console.log($event);
  }

}
