import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  loggedIn = false;

  constructor(private http: Http) { }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve(this.loggedIn), 800);
    });

    return promise;
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/login', user, {headers: headers}).map(res => res.json());
  }

  login() {
    this.loggedIn = true;
  }
  logout() {
    this.loggedIn = false;
  }
}
