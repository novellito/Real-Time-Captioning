import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentInfoService {

  classes:any;
  constructor(private http: Http) { }

  getClasses() {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/classes', {headers: headers})
      .map(res => res.json());

  }

  getTranscripts() {

  }

}
