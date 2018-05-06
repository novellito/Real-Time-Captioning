/**
 * This service has utility functions for all users
 *
*/
import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { saveAs } from 'file-saver';


@Injectable()
export class UserTypeService {

  transcriptTitle: string;
  transcripts = [];

  data: {userName: string, role: string, classID: string}; // The data used for deleting a specefic users class
  transcriptID: string; // Hash value of transcript to be deleted
  listElem: any; // a reference to the list element to be removed
  constructor(private http: Http) { }

   /**
   * @returns specefic transcript info (for populating editor)
   */
  loadTranscript(transcriptID) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/transcripts/id/${transcriptID}`, {headers: headers})
    .map(res => res.json());
  }

   /**
   * @returns a list of a users transcripts
   */
  getTranscripts(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/transcripts/courseID/${id}`, { headers: headers })
    .map(res => {
      this.transcripts = res.json().map(i => {
        return {id: i['_id'], transcriptName: i['transcriptName'], rawStatus: i['rawStatus'] }
      });
    });
  }

  /**
   * @returns a list of a user's classes
   */
  getClasses() {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (JSON.parse(localStorage.getItem('user')).role === 'captioner') {
      return this.http.get(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/captionists/username/${JSON.parse(localStorage.getItem('user')).userID}`,
        {headers: headers})
        .map(res => res.json());
    } else {
      return this.http.get(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/students/username/${JSON.parse(localStorage.getItem('user')).userID}`,
      {headers: headers})
      .map(res => res.json());
    }
  }

  // Deletes the transcript element visually and from the database
  deleteTranscript() {
    console.log(this.listElem)
    this.listElem.remove();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/transcripts/id/${this.transcriptID}`, {headers: headers})
    .map(res => res.json()).subscribe();
  }

  removeClass() {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.data.role === 'student') {
      return this.http.put(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/students/username/${this.data.userName}`, {id: this.data.classID}, {headers: headers})
      .map(res => res.json()).subscribe();
    } else {
       return this.http.put(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/captionists/username/${this.data.userName}`, {id: this.data.classID},
        {headers: headers})
        .map(res => res.json()).subscribe();
    }
  }


  // helper method to store references to the transcriptID and list element (used for deleting transcript)
  storeID(id, $event) {
    this.transcriptID = id;
    this.listElem = $event.target.parentElement;
  }

  /**
   * @returns a rtf version of the transcript and downloads it for the client
   */
  download(name, id, status) {
    return this.http.get(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/downloads/${id}/${status}`, {responseType: ResponseContentType.Blob})
    .map(res => new Blob([res.blob()], { type: 'application/rtf' })).subscribe(res => {
      saveAs(res, `${name}.rtf`);
    });
  }

}
