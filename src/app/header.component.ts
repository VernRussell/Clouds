import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloudComponent } from "./Cloud/cloud.component";
import { CloudService } from './Services/cloud.service';
import { SearchService } from './Services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cl-header',
  templateUrl: 'header.component.html',
	styleUrls: ['./app.component.css']
})

export class HeaderComponent  {
  
}