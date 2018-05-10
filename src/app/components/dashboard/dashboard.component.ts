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
  classes = [];
  classIDs = [];
  userType: string;
  userName: string;
  managing = false;
  classToDelete: any;

  constructor(
    private authService: AuthService,
    private http: Http,
    private user: UserTypeService
  ) {}

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem('user')).userID;
    this.userType = JSON.parse(localStorage.getItem('user')).role;
    this.classSubs = this.user.getClasses().subscribe(
      res => {
        this.classes = res[0].classes;
        res[0].classes.forEach((element, index) => {
          this.classIDs.push(element._id); // store class IDs for reference in loadTranscripts().
        });
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  // set up the class that the user will be deleting
  setClassData(className) {
    this.classToDelete = className;
    this.user.data = {
      userName: this.userName,
      role: this.userType,
      classID: className._id
    };
    console.log(this.user.data);
  }

  // Delete the selected class after confirming modal
  deleteClass() {
    this.classes = this.classes.filter(
      elem => elem.courseID !== this.classToDelete.courseID
    );
    this.user.removeClass();
  }

  // Load set of transcripts based on the id attribute.
  loadTranscripts($event) {
    this.transcriptSub = this.user
      .getTranscripts(this.classIDs[$event.currentTarget.id])
      .subscribe();
    this.transSubFlag = true;
  }

  onLogout() {
    this.authService.logout();
  }

  // Unsubscribe to the connections. (avoid memory leak)
  ngOnDestroy() {
    this.classSubs.unsubscribe();
    if (this.transSubFlag) {
      this.transcriptSub.unsubscribe();
    }
  }
}
