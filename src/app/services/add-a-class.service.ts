import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AddAClassService {

  constructor(private http: Http) { }


  getCourse(coursename) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.get(`https://api.metalab.csun.edu/curriculum/api/2.0/classes/${coursename}`, {headers: headers})
    .map(res => res.json());
  }

}
