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
  public selectedUseCases: Array<string>;
  public stageSelected:string;
  public account:string;
  public probability :string;
  checked = false;
  createdDate : Date;
  closeDate : Date;
  public admin:boolean;
  checklist= {'All' : false };
  dataSource: Array<Opportunity>;
  allOwners:Array<SelectOption>;
  allUseCases:Array<SelectOption>;
  allStages:Array<SelectOption>
  displaySource: Array<Opportunity>;
  constructor(private remoteActions : RemoteActionsService,private globals: Globals) {
    this.account='';
    this.globals.title='OPPORTUNITIES';
   }

   ngOnInit() {
    this.selectedUseCases = [];
    this.probability = null;
    this.ownerSelected='None';
    this.useCaseSelected='None';
    this.stageSelected='None';
    this.account='';
    this.createdDate = null;
    this.closeDate = null;
    this.remoteActions.isAdmin()
    .then(result => {
      this.globals.isAdmin = result as boolean;
      this.remoteActions.getOpportunities(this.globals.isAdmin,'None',['None'],'None','',null,null,null)
      .then(results => {
        console.log(results);
        this.mapObject(results);
      }).catch(error => {console.log(error)})

    }).catch(err => {console.log(err)});

    this.remoteActions.getUseCases()
    .then(res => {
      this.allUseCases= res as Array<SelectOption>;
      this.checklist['All']
      this.allUseCases.forEach(element => {
        this.checklist[element.value]=false;
      });
    }).catch(err=>console.log(err)); 

    this.remoteActions.getStage().then(res => this.allStages= res as Array<SelectOption>).catch(err=>console.log(err));

    this.remoteActions.getAllUsers()
    .then(res => {
      this.allOwners = res as Array<SelectOption>
    }).catch(err=>
      console.log(err)
    );
  }
  selectedChanged(event,dateParam){
    this[dateParam] = event;
    this.getOpporotunities();
  }
  public getOpporotunities() {
    let closeDateParams;
    let createdDateParams;
    if( this.closeDate as any == '' || this.closeDate == null) {
      closeDateParams= null;
    }else {
      closeDateParams= this.closeDate.toUTCString();
    }
    if( this.createdDate as any =='' || this.createdDate == null) {
      createdDateParams= null;
    }else {
      createdDateParams= this.createdDate.toUTCString();
    }
    if(this.probability == "") {
      this.probability = null;
    }
    this.remoteActions.getOpportunities(this.globals.isAdmin,this.ownerSelected,"('"+this.selectedUseCases.join("','")+"')",this.stageSelected,this.account,createdDateParams,closeDateParams,this.probability)
    .then(results =>{
      console.log(results);
      this.mapObject(results);
    })
    .catch(error => {console.log(error)});
  }

  public toggledCheckbox(value) {
    value = value =='All'? 'None': value;
    let index = this.selectedUseCases.indexOf(value)
    if(index>=0 && !this.checklist[value]) {

        this.selectedUseCases.splice(index,1);
    }else if(this.checklist[value]){

      this.selectedUseCases.push(value);
    }
    this.getOpporotunities();

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
  updateNote(id,event) {
    console.log(id);
    console.log(event.target.value);
    this.remoteActions.updateOppNote(id,event.target.value);
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
