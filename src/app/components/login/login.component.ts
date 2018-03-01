import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  invalidLogin = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.loggedInStatus()) {
      this.router.navigate(['dashboard']);
    }
  }

  onLogin() {
    this.authService.login();

    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {

      if(data.success) {
        console.log(data);
        this.authService.storeLoginData(data.token, data.user);
        this.router.navigate(['dashboard']);
        
      } else {
        this.invalidLogin = true;
        console.log("invalid");
        
      }
       // if success then store the data & navigate to dashboard --> else say wrong pw


    });



    // console.log(this.authService.loggedIn);
  }
  onLogOut() {
    this.authService.logout();
  }

 

}
