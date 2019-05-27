export class Document {
    public id: string;
    public attName: string;
    public description: string;
    public documentName: string;
    public downloadLink: string;

  
  
    constructor (obj) {
      this.id = obj.id;
      this.attName = obj.attName;
      this.description = obj.description;
      this.documentName = obj.documentName;
      this.downloadLink = obj.downloadLink;
    }
  }