import { Component, Input, OnInit, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl,  NgForm, NgModel, FormsModule, ReactiveFormsModule,
	FormGroup, 
	FormBuilder } from '@angular/forms'; 
import { CloudService } from '../Services/cloud.service';
import { Entry } from './classes/entry';
import { Item } from './classes/item';
import { User } from './directives/user.interface';
import { Acro } from './directives/acro.interface';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';

@Component({
	selector: 'cl-item',
	templateUrl: './item.component.html',
	styleUrls: ['../app.component.css']
})

export class ItemComponent implements OnInit {


  @Output()
  select: EventEmitter<any>;
  
  constructor(private itemService:CloudService, private route: ActivatedRoute) {

		this.select = new EventEmitter();
	}
	
  ngOnInit() {

  }

  // Shows the positions based on the job title selection
  onClick(isValid: boolean, f: User) {
    console.log("Clicked");
  }

}	
