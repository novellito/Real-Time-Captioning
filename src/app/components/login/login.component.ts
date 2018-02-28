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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.loggedIn) {
      this.router.navigate(['dashboard']);
    }
  }

  onLogin() {
    this.authService.login();
    this.router.navigate(['dashboard']);

    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {

      if(data.msg == "success") {
        console.log("login good!");
      } else {
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
