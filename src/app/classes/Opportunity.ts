export class Opportunity {
  public name: string;
  public accName: string;
  public stageName: string;
  public partnerName: string;
  public mrr: string;
  public ownerName: string;
  public closedDate: Date ;
  public useCase: string;
  public nextStep: string
  public description: string;



  constructor (obj) {
    this.name = obj.Name;
    this.accName = obj.Account.Name;
    this.stageName = obj.StageName;
    this.partnerName = obj.Partner_Name__c;
    this.mrr = obj.MRR__c;
    this.ownerName = obj.Owner.Name;
    this.closedDate = obj.CloseDate;
    this.useCase = obj.Oppty_Use_Case__c;
    this.nextStep = obj.NextStep;
    this.description = obj.Description;







  }
}