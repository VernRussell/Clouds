import { Component, Input, OnInit, OnDestroy, DoCheck, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl,  NgForm, NgModel, FormsModule, ReactiveFormsModule,
	FormGroup, 
	FormBuilder } from '@angular/forms'; 
import { CloudService } from '../Services/cloud.service';
import { SearchService } from '../Services/search.service';
import { Entry } from './classes/entry'
import { Item } from './classes/item'
import { Spec } from "./classes/spec";
import { Feature } from './classes/feature';
import { User } from './directives/user.interface';
import { Acro } from './directives/acro.interface';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';

@Component({
	selector: 'cl-cloud',
	templateUrl: './cloud.component.html',
	styleUrls: ['../app.component.css']
})

export class CloudComponent implements OnInit, OnDestroy, DoCheck {

  @Output()
  select: EventEmitter<any>;
  
  name: string = "";
  private sub: any;
  
  constructor(private searchService:SearchService, private cloudService:CloudService, private route: ActivatedRoute) {
		this.select = new EventEmitter();
	}
	
	// Start process of pulling in resume json file
	// Note: If app pulls in a partner component, this does nothing
  ngOnInit() {
    console.log("Hello");
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name']; // (+) converts string 'id' to a number
    });
    this.cloudService.PullInFeature(this.name);
    this.cloudService.PullInItems(this.name);
    this.cloudService.PullInSections(this.name);
    console.log("Good Bye!");
  }


  // After resume is in, set up the data
  ngDoCheck(){
        this.cloudService.SetupItems();
        this.cloudService.SetupFeatures();
        this.cloudService.SetupSections();
  }
  
  generateArray(obj){
   return Object.keys(obj).map((key)=>{ return obj[key]});
  }
  
  // Shows the positions based on the job title selection
  onClick(isValid: boolean, f: User) {
    console.log("Clicked");
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}	
