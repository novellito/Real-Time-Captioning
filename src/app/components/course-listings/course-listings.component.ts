import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-listings',
  templateUrl: './course-listings.component.html',
  styleUrls: ['./course-listings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseListingsComponent implements OnInit {

  classListings = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      console.log(params['course']);
      this.classListings = JSON.parse(localStorage.getItem('classList'));
      console.log(JSON.parse(localStorage.getItem('classList')));
      localStorage.removeItem('classList');

    });
  
    
  }
 
}
