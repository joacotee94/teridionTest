export class Document {
    public id: string;
    public attName: string;
    public description: string;
    public documentName: string;

  
  
    constructor (obj) {
      this.id = obj.id;
      this.attName = obj.attName;
      this.description = obj.description;
      this.documentName = obj.documentName;
    }
  }