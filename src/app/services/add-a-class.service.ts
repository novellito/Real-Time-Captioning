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


  addClassToCollection(classObj) {
    const data = {
      courseName: classObj.courseName.innerHTML.trim(),
      courseID: classObj.courseID.innerHTML.trim(),
      professor: classObj.name.innerHTML.trim(),
      days: classObj.days.innerHTML.trim(),
      time: classObj.startTime.innerHTML.trim() , // classObj.endTime.innerHTML
      location: classObj.location.innerHTML.trim()
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.post(`http://localhost:8080/api/classes`, data, {headers: headers})
    .map(res => res.json());
  }

  addClassToUser(classInfo) {
    
  }


}
