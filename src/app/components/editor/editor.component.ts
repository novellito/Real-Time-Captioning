import { Component, OnInit, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// override p with div tag
import * as Quill from 'quill';
let quill : any = Quill;
const Parchment = quill.import('parchment');
const Block = Parchment.query('block');


Block.tagName = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
quill.register(Block /* or NewBlock */, true);
// Add fonts to whitelist
const Font = quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'aref'];
quill.register(Font, true);

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

    toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'size': ['small', false, 'large', 'huge'] }]
    ];

  constructor() {
   }

  ngOnInit() {
  }


  logChange($event: any) {
    console.log($event);
  }

}
