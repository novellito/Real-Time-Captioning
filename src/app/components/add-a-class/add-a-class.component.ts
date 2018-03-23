import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AddAClassService } from './../../services/add-a-class.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-a-class',
  templateUrl: './add-a-class.component.html',
  styleUrls: ['./add-a-class.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AddAClassService]
})
export class AddAClassComponent implements OnInit {

  classArr = [];
  constructor(private addClass: AddAClassService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {}

  // Method to handle the data coming from the metalab api
  update(event) {
    this.addClass.getCourse(event.target.value).subscribe(data => {
      const newData = [];
      for (let i = 0; i < data.classes.length; i++) {
        if (newData.length === 0) {

          const newClass = {classObj: []};
          newClass.classObj.push(data.classes[i]);
          newData.push(newClass);

        } else if (data.classes[i].meetings.length === 0 || data.classes[i].instructors.length === 0) {
          // Do nothing if data is empty
        } else if (data.classes[i].catalog_number !== newData[newData.length - 1].
            classObj[newData[newData.length - 1].classObj.length - 1].catalog_number) { // courses differ create a new one

            const newClass = {classObj: []};
            newClass.classObj.push(data.classes[i]);
            newData.push(newClass);

        } else {
          newData[newData.length - 1].classObj.push(data.classes[i]); // curr & prev courses are the same just add it to the end
        }

      }
      this.classArr = newData;
      localStorage.setItem('classList', JSON.stringify(this.classArr)); // save class listing in local storage
      this.router.navigate(['/add-a-class', event.target.value]);

    });

  }

}
