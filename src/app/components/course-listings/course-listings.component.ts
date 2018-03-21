import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-listings',
  templateUrl: './course-listings.component.html',
  styleUrls: ['./course-listings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseListingsComponent implements OnInit {

  classListings = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      if (!JSON.parse(localStorage.getItem('classList'))) {
        this.router.navigate(['/add-a-class']); // redirect if there is no class selected
      } else {

        this.classListings = JSON.parse(localStorage.getItem('classList'));
        console.log(JSON.parse(localStorage.getItem('classList')));
        localStorage.removeItem('classList');
      }

    });

  }

}
