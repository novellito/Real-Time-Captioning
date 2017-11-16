/*
* This service handles the socket.io communication between the
* front-end and the back-end
*/
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

   private url = 'http://localhost:8080';
   private socket: SocketIOClient.Socket;

  constructor() { }

  /**
   * @param {any} message
   * @memberof
   * This function emits the message in the backend
   */
  sendMessage(message) {
    console.log(message);
    this.socket.emit('captionerDelta', message);
  }

  /**
   * @returns Observable
   * @memberof SocketService
   * This retrives the message sent from the backend back 
   * to the client.
   */
  getMessages() {
    const observable = new Observable(observer => {

      this.socket = io(this.url);
      this.socket.on('userDel', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  connect() { // establish connection with backend
    this.socket = io(this.url);
  }


}
