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
   * This function emits the captions in the backend
   */
  sendCaptions(message) {
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

      // this.socket = io(this.url);
      this.socket.on('captions', (data) => {
        observer.next(data);
      });
      // this.socket.on('dm', (data) => { TODO: DM between captioner & student
      //   observer.next(data);
      // });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  connect(id) { // establish connection with backend
    this.socket = io(this.url);
    this.socket.emit('room', {room_id : id});
  }


}
