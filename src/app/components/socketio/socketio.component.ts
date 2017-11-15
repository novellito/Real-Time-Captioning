import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './socketio.component.html',
  providers: [SocketService]
})
export class SocketioComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;

  constructor(private socketService: SocketService) {}

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}