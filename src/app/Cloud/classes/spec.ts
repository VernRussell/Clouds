import { Feature } from "./feature";

export class Spec {
  
  // This object will have three functionalities:
  // 1) Acronym/Name/Description Triad
  // 2) Section #/Lecture #/Name Triad (based on class section/lecture)
  // 3) Test Section Number/Name/Percentage
  
  constructor (public id: number, public name: string, public feature: Feature[] ) {
  }
}
