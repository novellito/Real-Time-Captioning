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

  // Method to add a new class to the classes collection
  addClassToCollection(classObj) {
    const data = { // prepare data to be sent
      courseName: classObj.courseName.innerHTML.trim(),
      courseID: classObj.courseID.innerHTML.trim(),
      professor: classObj.name.innerHTML.trim(),
      days: classObj.days.innerHTML.trim(),
      time: classObj.startTime.innerHTML.trim() + '-' + classObj.endTime.innerHTML.trim() , // classObj.endTime.innerHTML
      location: classObj.location.innerHTML.trim()
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.post(`https://demo-load-balancer-1858473610.us-west-2.elb.amazonaws.com:443/api/classes`, data, {headers: headers})
    .map(res => res.json());
  }

  // Method to determine which type of user to update
  addClassToUser(data) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    if (JSON.parse(localStorage.getItem('user')).role === 'captioner') {

      return this.http.put(`https://172.31.8.206:8080/api/captionists/username/${JSON.parse(localStorage.getItem('user')).userID}`,
      data, {headers: headers})
      .map(res => res.json());

    } else {

        return this.http.put(`https://172.31.8.206:8080/api/students/username/${JSON.parse(localStorage.getItem('user')).userID}`,
         data, {headers: headers})
        .map(res => res.json());
    }
  }

}
