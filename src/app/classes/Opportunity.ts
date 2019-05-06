export class Opportunity {
  name: string;
  accName: string;
  stageName: string;

  constructor (n:string, a:string, s:string) {
    this.name = n;
    this.accName = a;
    this.stageName = s;
  }
}