import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-course-listings',
  templateUrl: './course-listings.component.html',
  styleUrls: ['./course-listings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseListingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      console.log(JSON.parse(localStorage.getItem('classList')));
      localStorage.removeItem('classList');
      console.log(localStorage.getItem('classList'));
  }

}
