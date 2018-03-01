import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {

  loggedIn = false;
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve(this.loggedIn), 800);
    });

    return promise;
  }

  authenticateUser(user) {
    console.log('authenticating');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/login', user, {headers: headers}).map(res => res.json());
  }


  storeLoginData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken); //send token with request to the endpoint 
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/login', { headers: headers })
      .map(res => res.json());
  }


  //must use this method or else cannot authorize
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedInStatus() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null; //empty token
    this.user = null;
    localStorage.clear();
    this.loggedIn = false;

  }


  login() {
    this.loggedIn = true;
  }
  // logout() {
  //   this.loggedIn = false;
  // }
}
