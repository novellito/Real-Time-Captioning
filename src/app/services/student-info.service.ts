import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentInfoService {

  transcripts = [];
  constructor(private http: Http) { }

  /**
   * @returns a list of a students classes
   */
  getClasses() {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/classes', {headers: headers})
      .map(res => res.json());
  }

 /**
   * @returns a list of a students transcripts
   */
  getTranscripts(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:8080/api/transcripts/courseID/${id}`, { headers: headers })
    .map(res => this.transcripts = res.json().map(i => i['_id'])); // return a list of the transcript id's)
  }

}
