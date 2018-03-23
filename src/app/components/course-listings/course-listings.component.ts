import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { AddAClassService } from './../../services/add-a-class.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-listings',
  templateUrl: './course-listings.component.html',
  styleUrls: ['./course-listings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AddAClassService]
})
export class CourseListingsComponent implements OnInit,OnDestroy {

  classListings = [];
  addSubs: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private addAClass: AddAClassService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      if (!JSON.parse(localStorage.getItem('classList'))) {
        this.router.navigate(['/add-a-class']); // redirect if there is no class selected
      } else {
        this.classListings = JSON.parse(localStorage.getItem('classList'));
        localStorage.removeItem('classList');
      }

    });

  }

  addClass(classObj) {
   this.addSubs = this.addAClass.addClassToCollection(classObj).subscribe(data => {
     console.log(data);
       this.addAClass.addClassToUser(data ).subscribe(res => {
         console.log(res);
        });
   });
   const userID = JSON.parse(localStorage.getItem('user')).userID;
  }

  ngOnDestroy() {
        console.log('unsubscribing');
  }



}
