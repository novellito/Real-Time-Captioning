/*
* This service handles the socket.io communication between the
* front-end and the back-end
*/
import { UserTypeService } from 'app/services/user-type.service';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SocketService {

   private url = 'http://172.31.8.18:8080';
   private socket: SocketIOClient.Socket;
   public id: any; // Hash value of transcriptID
   public transcriptLoad = false; // transcript is not being viewed

  constructor(private http: Http, private user: UserTypeService) { }

  /**
   * @param {any} message
   * @memberof
   * This function emits the captions in the backend &
   *  saves the current contents in the database
   */
  sendCaptions(currDel, contents) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (!this.transcriptLoad) { // captioner is in session
      this.socket.emit('captionerDelta', {currDel: currDel, content: contents }); // emit captions to the student
      return this.http // send the contents to the database
      .put(`http://172.31.8.18:8080/api/transcripts/id/${this.id}`, {captions: contents}, { headers: headers })
      .map(res => res.json());
    } else { // captioner is editing a transcript
      return this.http // send the contents to the database
      .put(`http://172.31.8.18:8080/api/transcripts/id/${this.id}`, {modCaptions: contents, rawStatus: false}, { headers: headers })
      .map(res => res.json());
    }
  }

  /**
   * @returns Observable
   * @memberof SocketService
   * This retrives the message sent from the backend back 
   * to the client.
   */
  getMessages() {
    const observable = new Observable(observer => {

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


  connect(id) { // establish socket connection with backend
    this.socket = io(this.url);
    this.socket.emit('room', {room_id : id, user: JSON.parse(localStorage.getItem('user')).role});
  }


}
