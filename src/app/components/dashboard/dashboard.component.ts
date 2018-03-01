import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserTypeService } from './../../services/user-type.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UserTypeService]
})
export class DashboardComponent implements OnInit, OnDestroy {

  classSubs: Subscription;
  transcriptSub: Subscription;

  transSubFlag = false; // keep track if subscription is made
  classes: object;
  classIDs = [];
  userObj: object;

  constructor(private router: Router, private authService: AuthService, private http: Http, private user: UserTypeService, ) { }

  ngOnInit() {
      this.classSubs = this.user.getClasses().subscribe(res => {
      this.classes = res;
      for (const elem of res){
        this.classIDs.push(elem._id); // store class IDs for reference in loadTranscripts().
      }
    },
    err => {
      console.log(err);
      return false;
    });

    this.authService.getProfile().subscribe(profile => {
      this.userObj = profile.user;
    });
  
  }

  // Load set of transcripts based on the id attribute.
  loadTranscripts($event) {
    this.transcriptSub = this.user.getTranscripts(this.classIDs[$event.currentTarget.id]).subscribe();
    this.transSubFlag = true;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    return false; //maybe delete
  }

  // Unsubscribe to the connections. (avoid memory leak)
  ngOnDestroy() {
    this.classSubs.unsubscribe();
    if (this.transSubFlag) {
      this.transcriptSub.unsubscribe();
    }
  }


}
