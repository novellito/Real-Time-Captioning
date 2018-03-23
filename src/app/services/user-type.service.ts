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

  userType: string;
  transcriptTitle: string;
  transcripts = [];

  transcriptID: string; // Hash value of transcript to be deleted
  listElem: any; // a reference to the list element to be removed
  constructor(private http: Http) { }

   /**
   * @returns specefic transcript info (for populating editor)
   */
  loadTranscript(transcriptID) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:8080/api/transcripts/id/${transcriptID}`, {headers: headers})
    .map(res => res.json());
  }

   /**
   * @returns a list of a users transcripts
   */
  getTranscripts(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:8080/api/transcripts/courseID/${id}`, { headers: headers })
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

  
    // handle if student or captioner
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // return this.http.get(`http://localhost:8080/api/captionists/username/${JSON.parse(localStorage.getItem('user')).userID}`,
    //   {headers: headers})
    //   .map(res => res.json());

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:8080/api/students/username/${JSON.parse(localStorage.getItem('user')).userID}`,
      {headers: headers})
      .map(res => res.json());
  }

  // Deletes the transcript element visually and from the database
  deleteTranscript() {
    this.listElem.remove();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(`http://localhost:8080/api/students/username/${this.transcriptID}`, {headers: headers})
    .map(res => res.json()).subscribe();
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
    return this.http.get(`http://localhost:8080/api/downloads/${id}/${status}`, {responseType: ResponseContentType.Blob})
    .map(res => new Blob([res.blob()], { type: 'application/rtf' })).subscribe(res => {
      saveAs(res, `${name}.rtf`);
    });
  }

}
