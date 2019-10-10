export class User {
    public Id:string;
    public FirstName: string;
    public LastName: string;
    public Email: string;
    public Phone:string;
    public Title:string;
    constructor (obj) {
      this.Id = obj.Id;
      this.FirstName = obj.FirstName;
      this.LastName = obj.LastName;
      this.Email = obj.Email;
      this.Phone = obj.Phone;
      this.Title = obj.Title;
    }
  }