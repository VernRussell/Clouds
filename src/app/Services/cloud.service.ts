import { Http, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { SearchService} from './search.service';
import { Entry } from '../Cloud/classes/entry';
import { Spec } from '../Cloud/classes/spec';
import { Course } from '../Cloud/classes/course';

@Injectable()
export class CloudService {
  
  public entry: Entry;
  public spec: Spec;
  public course: Course;
  
  public featureIndex: number;
  public itemIndex: number;
  public sectionIndex: number;
  
  public entryJson: string;
  public itemsJson: string;
  public sectionsJson: string;
  
  constructor(private searchService:SearchService) {}
  
  // Starts process to pull in my resume Json file via search service
    public PullInFeature(name: string) {
        this.featureIndex = 0;
        if (!this.spec) {
            console.log("Feature Begin");
            this.searchService.fetchFeature(name);
            console.log("Feature Refresh");
        }
    }
    
      // Starts process to pull in my resume Json file via search service
    public PullInItems(name: string) {
        this.itemIndex = 0;
        if (!this.entry) {
            console.log("Items Begin");
            this.searchService.fetchItems();
            console.log("Items Refresh");
        }
    }
    
    // Starts process to pull in my resume Json file via search service
    public PullInSections(name: string) {
        this.sectionIndex = 0;
        if (!this.course) {
            console.log("Sections Begin");
            this.searchService.fetchSections(name);
            console.log("Sections Refresh");
        }
    }
    
    public SetupItems(){
        console.log("Changed Items: " + this.entry);
        if (this.entry === undefined){
           this.entry = this.searchService.getItems();
            this.itemsJson = JSON.stringify(this.entry);
      }
        
        if (this.entry) {
            this.entry.id = this.itemIndex;
            console.log(this.entry);
        }
        else {
            console.log("No items retrieved yet!");
        }
    }
    
    public SetupSections(){
        console.log("Changed Sections: " + this.course);
        if (this.course === undefined){
           this.course = this.searchService.getSections();
      }
        
        if (this.course) {
            console.log("Got it!");
            this.course.id = this.sectionIndex;
            console.log(this.course);
        }
        else {
            console.log("No sections retrieved yet!");
        }
    }
  
    // Checks for the arrival of the resume object
    // Once it arrives, loads in All of the data
    // and performs All pre-calculations required to render the pages
    public SetupFeatures(){
        console.log("Changed Feature: " + this.spec);
        if (this.spec === undefined){
           this.spec = this.searchService.getFeatures();
            this.entryJson = JSON.stringify(this.spec);
            console.log("Items Refresh" + this.itemsJson);
            }
        
        if (this.spec) {
            console.log(this.spec.name);
            this.spec.id = this.featureIndex;
            console.log(this.entry);
        }
        else {
            console.log("No features retrieved yet!");
        }
    }
}