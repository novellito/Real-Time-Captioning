/**
 * This service has utility functions for all users
 *
*/
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class UserTypeService {

  userType: string;
  transcriptTitle: string;
  transcripts = [];

  constructor(private http: Http) { }

   /**
   * @returns specefic transcript info
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
        return {id: i['_id'], transcriptName: i['transcriptName'] }
      });
    });
  }

  /**
   * @returns a list of a user's classes
   */
  getClasses() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/classes', {headers: headers})
      .map(res => res.json());
  }


}
