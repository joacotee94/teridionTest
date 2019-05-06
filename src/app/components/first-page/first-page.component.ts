import { Component, OnInit } from '@angular/core';
import { RemoteActionsService } from '../../services/remote-actions';
import { Opportunity } from '../../classes/Opportunity';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  opportunities: Array<Opportunity>;

  constructor(private remoteActions : RemoteActionsService) {
    this.opportunities = new Array<Opportunity>();
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
