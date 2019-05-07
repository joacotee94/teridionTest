import { Component, OnInit, Input } from '@angular/core';
import { RemoteActionsService } from '../../services/remote-actions';
import { Opportunity } from '../../classes/Opportunity';
import {Globals} from '../../globals';
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})


export class FirstPageComponent implements OnInit {
 
  opportunities: Array<Opportunity>;

  constructor(private remoteActions : RemoteActionsService, private globals: Globals) {
    this.opportunities = new Array<Opportunity>();
    this.globals.title='';
   }

   ngOnInit() {
   
    this.remoteActions.getOpportunities()
    .then(results =>{
      console.log(results);
      this.mapObject(results);
    })
    .catch(error => console.log(error));
  }

  private mapObject(arr) {
    debugger;
    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      let o = new Opportunity(obj.Name, obj.Account.Name, obj.StageName);
      this.opportunities.push(o);
    }
  }
}
