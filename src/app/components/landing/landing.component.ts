import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  start = false;
  loggedOut = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit () {
    setTimeout(() => this.start = true, 500);
    if (this.authService.loggedInStatus()) {
      this.loggedOut = false;
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

}
