import { Component, Input, OnInit, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl,  NgForm, NgModel, FormsModule, ReactiveFormsModule,
	FormGroup, 
	FormBuilder } from '@angular/forms'; 
import { CloudService } from '../Services/cloud.service';
import { Feature } from './classes/feature';
import { User } from './directives/user.interface';
import { Acro } from './directives/acro.interface';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';

@Component({
	selector: 'cl-input',
	templateUrl: './input.component.html',
	styleUrls: ['../app.component.css']
})

export class InputComponent implements OnInit {
	searchField: FormControl;
	coolForm: FormGroup;
	public user: User;
	public acro: Acro;
	public json: string;
	public eJson: string;
	public wordList: string[] = [];
	private phrases: string[];
	private newID: number;

  @Output()
  select: EventEmitter<any>;
  
  constructor(private cloudService:CloudService, private fb:FormBuilder, private route: ActivatedRoute) {
		this.searchField = new FormControl();
		this.coolForm = fb.group({search: this.searchField});
		this.select = new EventEmitter();
	}
	
  ngOnInit() {
     this.user = {
      name: ''
    };
    this.acro = {
      name: ''
    };
  }
  
  private processJson(isEntry: boolean, pos: number ){
  
   if (pos === 0) {
    var lastID = this.json.lastIndexOf('"id":');
    console.log(lastID);
    this.newID = Number(this.json.substring(lastID + 6, lastID + 10).split('"')[0]) + 1;
    console.log("The last id: " + lastID + "-> " + this.json.substring(lastID+6, lastID + 10).split('"')[0] + ' --> ' + this.newID);
    this.json = this.json.substring(0, this.json.length - 2);
   }
   else {
       this.newID++;
   }
   
   this.json += ', { "id": "' + this.newID + '",\n"name": "';

   if (isEntry === true){
      if (this.phrases.length > 0){
         this.json += this.phrases[0] + '",\n"description":\n["' + this.phrases[1] + '"';
        
        for (var i = 2; i < this.phrases.length; i++){
          this.json += ',\n"' + this.phrases[i] + '"';
        }
      }
   }
   else {
      this.json += this.phrases[0] + '", "acronym": "' + this.phrases[1] + '", "description": "' + this.phrases[2] + '" }';
   }
  }
  
  private postJson(forJson: string){
    var theJSON = JSON.stringify(forJson);
    var uri = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);
    
    var a = document.createElement('a');
    a.href = uri;
    a.innerHTML = "Right-click and choose 'save as...'";
    document.body.appendChild(a);
  }
  
  private processPhrases(u: User, a: Acro){
    console.log(this.phrases);
    var words = u.name.split(' ');
    var size = 2;
    
    for (var i=0; i < words.length; i++){
      var toPut = words[i];
      for (var j = i + 1; j < words.length && j < i + size; j++){
           if (this.wordList.indexOf(toPut) < 0 && toPut === toPut.toUpperCase()){
             this.wordList.push(toPut);
           }
           if (j + 1 < words.length && words[j] === words[j].toUpperCase()){
            var ucWord = words[j].toUpperCase();
            var word = words[j];
            console.log(ucWord === word, word);
            toPut += ' ' + words[j].toUpperCase();
           }
      }
    }
  }

  // Shows the positions based on the job title selection
  onClick(isValid: boolean, u: User) {
    console.log("Clicked");
    if (!isValid) return;
   this.phrases = u.name.split('`');
 
   this.json = this.cloudService.entryJson;
    this.processJson(true, 0);
    this.eJson = this.json + "\n] }\n ]}";
    this.postJson(this.eJson);
  }
  
  // Shows the positions based on the job title selection
  onClickItem(isValid: boolean, a: Acro) {
    console.log("Clicked Item");
    if (!isValid) return;
   var linxx = a.name.split('|').length;
    this.json = this.cloudService.itemsJson;
   console.log (linxx + " returned. " + this.json );
       for (var l = 0; l < linxx; l++) {
          this.phrases = a.name.split('|')[l].replace(' (', '`').replace(') ', '`').split('`');
          console.log(this.phrases);
          this.processJson(false, l);
       }
    this.json += "\n ]}";
    this.postJson(this.json);
  }	
}