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
  fileToUpload: File;
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

   changefile(files: FileList) {
    this.fileToUpload = files[0];
    if(this.fileToUpload!=null){
      var reader = new FileReader();
      reader.onload = (function(file, remoteActions,snackBar) {
        return function(e) {
          var contents =e.target.result.split(',')[1];
          if(contents.length < 6000000) {
            remoteActions.uploadResellerCertificate(contents,file.type)
            .then((res)=>{
              let config = new MatSnackBarConfig();
              config.verticalPosition = 'bottom';
              config.horizontalPosition = 'center';
              config.duration = 2000;
              snackBar.open(res as string,'',config);

            }).catch((err)=>{
              let config = new MatSnackBarConfig();
              config.verticalPosition = 'bottom';
              config.horizontalPosition = 'center';
              config.duration = 2000;
              snackBar.open(err.message,'',config); 
            } );
          } else {
            let config = new MatSnackBarConfig();
            config.verticalPosition = 'bottom';
            config.horizontalPosition = 'center';
            config.duration = 2000;
            snackBar.open("Base 64 Encoded file is too large.  Maximum size is " + 6000000 + " your file is " + contents.length + ".",'',config);
          }

        };
      })(this.fileToUpload,this.remoteActions,this.snackBar);   
      reader.readAsDataURL(this.fileToUpload);
      }   
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
      Legal_Billing_Entity__c: new FormControl(partner.Legal_Billing_Entity__c, []),
      Tax_ID__c: new FormControl(partner.Tax_ID__c,[]),
      Billing_Email_Address__c: new FormControl(partner.Billing_Email_Address__c,[]),
      Sales_Tax_Exempt__c: new FormControl(partner.Sales_Tax_Exempt__c,[]),
      Bank_Name__c : new FormControl(partner.Bank_Name__c,[]),
      Bank_Address__c : new FormControl(partner.Bank_Address__c,[]),
      Account_Name__c :  new FormControl(partner.Account_Name__c, []),
      Account_Number__c : new FormControl(partner.Account_Number__c,[]),
      Routing_Number_ACH__c : new FormControl(partner.Routing_Number_ACH__c,[]),
      SWIFT__c : new FormControl(partner.SWIFT__c,[]),
      IBAN__c : new FormControl(partner.IBAN__c,[])

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
  get BillingStreet() {
    return this.partner.get('BillingStreet');
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
  get Billing_Email_Address__c() {
    return this.partner.get('Billing_Email_Address__c');
  }
  get Legal_Billing_Entity__c() {
    return this.partner.get('Legal_Billing_Entity__c');
  }
  get Tax_ID__c () {
    return this.partner.get('Tax_ID__c');
  }
  get Sales_Tax_Exempt__c() {
    return this.partner.get('Sales_Tax_Exempt__c');
  }
  get Bank_Name__c() {
    return this.partner.get('Bank_Name__c');
  }
  get Bank_Address__c() {
    return this.partner.get('Bank_Address__c');
  }
  get Account_Name__c() {
    return this.partner.get('Account_Name__c');
  }
  get Account_Number__c() {
    return this.partner.get('Account_Number__c');
  }
  get Routing_Number_ACH__c() {
    return this.partner.get('Routing_Number_ACH__c');
  }
  get SWIFT__c() {
    return this.partner.get('SWIFT__c');
  }
  get IBAN__c() {
    return this.partner.get('IBAN__c');
  }
  


}
