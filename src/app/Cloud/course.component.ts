import { Component, Input, OnInit, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl,  NgForm, NgModel, FormsModule, ReactiveFormsModule,
	FormGroup, 
	FormBuilder } from '@angular/forms'; 
import { CloudService } from '../Services/cloud.service';
import { Course } from "./classes/course";
import { Section } from "./classes/section";
import { Lecture } from "./classes/lecture";
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';

@Component({
	selector: 'cl-course',
	templateUrl: './course.component.html',
	styleUrls: ['../app.component.css']
})

export class CourseComponent implements OnInit {


  @Output()
  select: EventEmitter<any>;
  
  constructor(private courseService:CloudService, private route: ActivatedRoute) {

		this.select = new EventEmitter();
	}
	
  ngOnInit() {

  }

  // Shows the positions based on the job title selection
  onClick() {
    console.log("Clicked");
  }

}	
