export class User {
    public FirstName: string;
    public LastName: string;
    public Email: string;
    public Phone:string;
    public Title:string;
    constructor (obj) {
      this.FirstName = obj.FirstName;
      this.LastName = obj.LastName;
      this.Email = obj.Email;
      this.Phone = obj.Phone;
      this.Title = obj.Title;
    }
  }