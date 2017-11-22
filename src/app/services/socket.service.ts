/*
* This service handles the socket.io communication between the
* front-end and the back-end
*/
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SocketService {

   private url = 'http://localhost:8080';
   private socket: SocketIOClient.Socket;
   public id: any;

  constructor(private http:Http) { }

  /**
   * @param {any} message
   * @memberof
   * This function emits the captions in the backend
   */
  sendCaptions(del) {
    //5a16035bd8f6131e348af771 - comp 490 id put into url
    console.log(del);
   
    this.socket.emit('captionerDelta', del);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`http://localhost:8080/api/transcripts/id/${this.id}`, {captions: del}, { headers: headers })
    .map(res => res.json());

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
