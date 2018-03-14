import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string;
  password: string;
  invalidLogin = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.loggedInStatus()) { // redirect to dashboard
      this.router.navigate(['dashboard']);
    }
  }

  onLogin() {
    const user = {
      username: this.username,
      password: this.password
    };

   this.authSubscription = this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeLoginData(data.token, data.userData);
        this.router.navigate(['dashboard']);
      } else {
        this.invalidLogin = true;
      }

    });

  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
      this.authSubscription.unsubscribe();
  }

}
