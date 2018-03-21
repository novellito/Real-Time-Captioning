import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AddAClassService } from './../../services/add-a-class.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-a-class',
  templateUrl: './add-a-class.component.html',
  styleUrls: ['./add-a-class.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AddAClassService]
})
export class AddAClassComponent implements OnInit, OnDestroy {

  // item: strinewData = [];
  classArr = [];
  classSelection = false;


  constructor(private addClass: AddAClassService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.params['course']) { // selecting a course
      
      console.log("hey");
      // console.log(this.addClass.classArr);
      this.route.queryParams.subscribe(params => {
       console.log(params)
    });
    }
    
  }

  update(event) {
    console.log(event.target.value);
    this.addClass.getCourse(event.target.value).subscribe(data => {
      const newData = [];
      for(let i = 0; i < data.classes.length; i++) {
        if(newData.length === 0) {

          const newClass = {classObj: []};
          newClass.classObj.push(data.classes[i]);
          newData.push(newClass);

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
      // this.classSelection = true;
      this.route.snapshot.data = newData;

      this.router.navigate([`add-a-class/test`, newData]);
      // console.log(data);
      
    });

    // make call to service -- when successful redirect to /:classname
  }

  ngOnDestroy() {
    this.addClass.classArr = this.classArr;
    console.log(this.addClass.classArr);
  }

}
