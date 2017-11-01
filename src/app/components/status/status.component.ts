import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  serverOnline = false;

  constructor() { }

  ngOnInit() {
  }

  setStatus() {
    const style = {'background': this.serverOnline ? 'green' : 'red'};
    return style;
  }

}
