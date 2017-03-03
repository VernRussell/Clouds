export class Feature {
  
  // Usually a description is simply a line of text
  // However, the text can also comprise the name of a secondary feature
  constructor (public id: number, public name: string, public descriptions: string[] ) {
  }
}
