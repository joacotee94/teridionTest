import { Component, OnInit } from '@angular/core';
import {RemoteActionsService} from '../../services/remote-actions';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import {Partner} from '../../classes/Partner';
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  partner: FormGroup;
  constructor(private remoteActions:RemoteActionsService, private snackBar:MatSnackBar) {
      this.partner = this.createDealForm({} as Partner);
      this.remoteActions.getPartnerInfo()
      .then((result)=>{
        let resp = result as Partner;
        this.partner = this.createDealForm(resp);
      })
      .catch((err)=> {
        console.log(err);
       })
   }


  ngOnInit() {
  }

  createDealForm(partner: Partner) {
    return new FormGroup({
      Name: new FormControl(partner.Name, [Validators.required]),
      Website: new FormControl(partner.Website, []),
      hearAboutTeridion__c: new FormControl(partner.hearAboutTeridion__c, []),
      numberOflocations__c: new FormControl(partner.numberOflocations__c, []),
      BillingStreet: new FormControl(partner.BillingPostalCode+ ', ' +partner.BillingCountry+', ' + partner.BillingCity+', '+partner.BillingState, []),
      BillingCountry: new FormControl(partner.BillingCountry,[] ),
      BillingCity: new FormControl(partner.BillingCity,[] ),
      BillingState: new FormControl(partner.BillingState,[] ),
      overAllHeadCount__c: new FormControl(partner.overAllHeadCount__c, [Validators.required]),
      networkingRevenue__c: new FormControl(partner.networkingRevenue__c, [Validators.required]),
      teritories__c: new FormControl(partner.teritories__c, [Validators.required]),
      totalHeadCount__c: new FormControl(partner.totalHeadCount__c, [Validators.required]),
      totalRevenue__c: new FormControl(partner.totalRevenue__c,[] ),
    })
  }

  updatePartner() {
    this.remoteActions.savePartenerInfo(this.partner.getRawValue()).then((res)=>{this.openSnackBar(res)}).catch((err)=>{this.openSnackBar(err)})
  }
  
  openSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    this.snackBar.open(message, '', config)
  } 

  get Name() {
    return this.partner.get('Name');
  }
  get Website() {
    return this.partner.get('Website');
  }  
  get hearAboutTeridion__c() {
    return this.partner.get('hearAboutTeridion__c');
  }  
  get numberOflocations__c() {
    return this.partner.get('numberOflocations__c');
  } 
   get BillingPostalCode() {
    return this.partner.get('BillingPostalCode');
  }  
  get BillingCountry() {
    return this.partner.get('BillingCountry');
  }  
  get BillingCity() {
    return this.partner.get('BillingCity');
  }  
  get BillingState() {
    return this.partner.get('BillingState');
  }  
  get overAllHeadCount__c() {
    return this.partner.get('overAllHeadCount__c');
  }
  get networkingRevenue__c() {
    return this.partner.get('networkingRevenue__c');
  }
  get teritories__c() {
    return this.partner.get('teritories__c');
  }
  get totalHeadCount__c() {
    return this.partner.get('totalHeadCount__c');
  }
  get totalRevenue__c() {
    return this.partner.get('totalRevenue__c');
  }
  
}
