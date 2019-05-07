import { Component, OnInit } from '@angular/core';
import { Opportunity } from '../../classes/Opportunity';
import { RemoteActionsService } from '../../services/remote-actions';
import {Globals} from '../../globals';


@Component({
  selector: 'app-other-page',
  templateUrl: './other-page.component.html',
  styleUrls: ['./other-page.component.css']
})

export class OtherPageComponent implements OnInit {
  displayedColumns = ['name', 'account', 'stageName'];

  dataSource: Array<Opportunity>;

  constructor(private remoteActions : RemoteActionsService,private globals: Globals) {
    this.globals.title='other Page';
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
    this.dataSource = new Array<Opportunity>();

    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      let o = new Opportunity(obj.Name, obj.Account.Name, obj.StageName);
      this.dataSource.push(o);
    }
  }
}
