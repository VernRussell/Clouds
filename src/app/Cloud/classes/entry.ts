import { Item } from "./item";

export class Entry {
  
  // This object will have three functionalities:
  // 1) Acronym/Name/Description Triad
  // 2) Section #/Lecture #/Name Triad (based on class section/lecture)
  // 3) Test Section Number/Name/Percentage
  
  constructor (public id: number, public name: string, public items: Item[] ) {
  }
}

// Project notes here:
// Have set up the initial routes and have the Json files reading properly
// Sun AM: Set up code to read a Spec object and generate JSON.
// Issues: #1 the json does not want to show on the screen
// Need to get it so I can read some text, generate the JSON, update the JSON file in good flow

// So now when you put in new text, it will show the updated JSON, which you can simply check parse and post into the Json file.
// No errors, no checking, no changing ....

// Next: Get this working for Items
// Now it is working for either, at least as long I put the data in the proper format

// Loaded in all of the course sections earlier today

// Next I collected all of the Acronyms in the course and modified the JSON code to accept multiples.
// Key -- Put | between each line
// Note may work for other category
// Take a break now -- Look into how to handle other cases including leveling


