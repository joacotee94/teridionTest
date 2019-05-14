import { Component, OnInit } from '@angular/core';
import { Opportunity } from '../../classes/Opportunity';
import { User } from '../../classes/User';
import { SelectOption } from '../../classes/SelectOption';
import {Input} from '@angular/core';
import { RemoteActionsService } from '../../services/remote-actions';
import {Globals} from '../../globals';


@Component({
  selector: 'opp-component',
  templateUrl: './opp-component.component.html',
  styleUrls: ['./opp-component.component.css']
})

export class OppComponent implements OnInit {
  displayedColumns = ['name','partnerName','mrr','owner','closeDate','useCase','nextStep','account','stageName','edit'];
  public ownerSelected:string;
  public useCaseSelected:string;
  public stageSelected:string;
  public account:string;
  public probability :string;s
  @Input() createdDate : Date;
  @Input() closeDate : Date;
  public admin:boolean;

  dataSource: Array<Opportunity>;
  allOwners:Array<User>;
  allUseCases:Array<SelectOption>;
  allStages:Array<SelectOption>
  displaySource: Array<Opportunity>;
  constructor(private remoteActions : RemoteActionsService,private globals: Globals) {
    this.account='';
    this.globals.title='OPPORTUNITIES';
   }

   ngOnInit() {
    this.ownerSelected='None';
    this.useCaseSelected='None';
    this.stageSelected='None';
    this.account='';
    this.createdDate = new Date();
    this.closeDate = new Date();
    this.remoteActions.isAdmin()
    .then(result => {
      this.globals.isAdmin = result as boolean;
      this.remoteActions.getOpportunities(true,[],'None','None','None','',null,null,null)
      .then(results => {
        console.log(results);
        this.mapObject(results);
      }).catch(error => {console.log(error)})

    }).catch(err => {console.log(err)});

    this.remoteActions.getUseCases().then(res => this.allUseCases= res as Array<SelectOption>).catch(err=>console.log(err)); 

    this.remoteActions.getStage().then(res => this.allStages= res as Array<SelectOption>).catch(err=>console.log(err)); 
  }
  selectedChanged(event){
    console.log('Created Date ' + this.createdDate);
    console.log('Created Date ' + event);

    console.log('Close Date ' + this.closeDate);
    console.log('Close Date ' + this.closeDate);

  }
  public getOpporotunities() {
    let userIds = [];
    let closeDateParams;
    let createdDateParams;
    if( this.closeDate as any == '' || this.closeDate == null) {
      closeDateParams= null;
    }else {
      closeDateParams= this.closeDate.toUTCString();
    }
    if( this.closeDate as any =='' || this.createdDate == null) {
      createdDateParams= null;
    }else {
      createdDateParams= this.closeDate.toUTCString();
    }
    this.remoteActions.getOpportunities(true,userIds,this.ownerSelected,this.useCaseSelected,this.stageSelected,this.account,createdDateParams,closeDateParams,this.probability)
    .then(results =>{
      console.log(results);
      this.mapObject(results);
    })
    .catch(error => {console.log(error)});

  }

  private mapUser(arr) {
    this.allOwners = new Array<User>();
    for(let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      let u = new User(obj);
      this.allOwners.push(u);
    }
  }
  private mapObject(arr) {
    this.dataSource = new Array<Opportunity>();

    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      let o = new Opportunity(obj);
      this.dataSource.push(o);
    }
    this.displaySource= this.dataSource;
  }
  private formatDate(vDate){
    var format = 'AM';
    var hour = vDate.getHours();
    var min = vDate.getMinutes();
    var minStr='';
    if (hour > 11) format = 'PM';
    if (hour > 12) hour = hour - 12;
    if (hour == 0) hour = 12;
    if (min < 10) minStr = '0' + min;
    var finalDateTime = (vDate.getMonth() + 1) + '/' + vDate.getDate() + '/' + vDate.getFullYear() + ' ' + hour + ':' + minStr + ' ' + format;
    return finalDateTime;
}
}
