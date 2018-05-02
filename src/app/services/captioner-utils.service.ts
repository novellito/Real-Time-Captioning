import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CaptionerUtilsService {

  constructor(private http: Http) { }

   // Takes the couresID (from URL) to get full info about the class
   getClass(courseID) {
     const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.get(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/classes/courseID/${courseID}`, {headers: headers})
     .map(res => res.json());
    }

    // Takes the unique hash value of the class id & create a new transcript
    createTranscript(id) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/transcripts`, {courseID: id} , {headers: headers})
      .map(res => res.json());
    }

    // Method for updating the transcripts title in the database
    updateTranscriptTitle(id, name) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http // send the contents to the database
          .put(`http://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:8080/api/transcripts/id/${id}`, {transcriptName: name}, { headers: headers })
          .map(res => res.json());
    }


}

