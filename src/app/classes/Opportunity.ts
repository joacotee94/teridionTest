export class Opportunity {
  public id:string
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
  public note:string;



  constructor (obj) {
    this.id = obj.Id;
    this.name = obj.Name;
    if(obj.Account!=null){
      this.accName = obj.Account.Name;
    }else {
      this.accName= '';
    }
    this.stageName = obj.StageName;
    this.partnerName = obj.Partner_Name__c;
    this.mrr = obj.MRR_Estimated_Committed__c;
    this.ownerName = obj.Owner.Name;
    this.closedDate = obj.CloseDate;
    this.useCase = obj.Oppty_Use_Case__c;
    this.nextStep = obj.NextStep;
    this.description = obj.Description;
    this.note=obj.Note__c;







  }
}