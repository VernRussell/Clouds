import { Http, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Entry } from '../Cloud/classes/entry'
import { Item } from '../Cloud/classes/item'
import { Spec } from "../Cloud/classes/spec";
import { Feature } from "../Cloud/classes/feature";
import { Course } from "../Cloud/classes/course";
import { Section } from "../Cloud/classes/section";
import { Lecture } from "../Cloud/classes/lecture";

@Injectable()
export class SearchService {
  
  constructor(private http: Http) {}
  
  private jsonPath: string = './app/JsonFiles/';
  private itemJson: string = 'Items.json';
  private specJson: string = 'Specs.json';
  private sectJson: string = 'Sections.json';
  
  private courses: string[] = [ "Azure70534"];

  private notFoundItem: Entry = new Entry( 0,	"Items not found.",  new Array<Item>());
  private notFoundFeature: Spec = new Spec(0, "Features not found", new Array<Feature>());
  private notFoundCourse: Course = new Course(0, "Course not found", new Array<Section>());
  
  private itemMaps: Entry;
  private courseMaps: Course;
  private maps: Spec;
  
  itemsChanged = new EventEmitter<Entry>();
  featuresChanged = new EventEmitter<Spec>();
  sectionsChanged = new EventEmitter<Course>();
  
  // Pull the resume data into the object
  getItems() {
    console.log("Get Items: " + this.itemMaps);
   return this.itemMaps;
  }
  
  getFeatures() {
    console.log("Get Features: " + this.maps);
   return this.maps;
  }
  
  getSections() {
    console.log("Get Sections: " + this.courseMaps);
   return this.courseMaps;
  }
  
  // Pull from Json and subscribe to the data
  fetchItems() {
     var jsonName = this.jsonPath + this.itemJson;
     console.log(jsonName);
     return this.http.get(jsonName)
            .map((response: Response) => response.json())
      .subscribe(
        (data: Entry) => {
          this.itemMaps = data;
          this.itemsChanged.emit(this.itemMaps);
          console.log( this.itemMaps);
        },
        err => { console.log("Items not found: " + err);
           this.itemMaps = this.notFoundItem;
        },
        () =>  console.log("Done: " + this.itemMaps)
      );
   }
   
     // Pull from Json and subscribe to the data
  fetchSections(name: string) {
    if (!name) name = this.courses[0];
    var jsonName = this.jsonPath + name + this.sectJson;
     console.log(jsonName);
     return this.http.get(jsonName)
            .map((response: Response) => response.json())
      .subscribe(
        (data: Course) => {
          this.courseMaps = data;
          this.sectionsChanged.emit(this.courseMaps);
          console.log( this.courseMaps);
        },
        err => { console.log("Course not found: " + err);
           this.courseMaps = this.notFoundCourse;
        },
        () =>  console.log("Done: " + this.courseMaps)
      );
   }
  
  // Pull from Json and subscribe to the data
  fetchFeature(name: string) {
     if (!name) name="default";
     var jsonName = this.jsonPath + name + this.specJson;
     console.log(jsonName);
     return this.http.get(jsonName)
            .map((response: Response) => response.json())
      .subscribe(
        (data: Spec) => {
          this.maps = data;
          this.featuresChanged.emit(this.maps);
          console.log( this.maps);
        },
        err => { console.log("Feature not found: " + err);
           this.maps = this.notFoundFeature;
           console.log( this.maps);
        },
        () =>  console.log("Done: " + this.maps)
      );
   }
}