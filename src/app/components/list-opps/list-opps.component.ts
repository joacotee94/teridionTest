import { Component, OnInit } from '@angular/core';
import { RemoteActionsService } from '../../services/remote-actions';
import {Globals} from '../../globals';
import { Opportunity } from '../../classes/Opportunity';

@Component({
  selector: 'app-list-opps',
  templateUrl: './list-opps.component.html',
  styleUrls: ['./list-opps.component.css']
})
export class ListOppsComponent implements OnInit {
  dataSource: Array<Opportunity>;
  displayedColumns = ['name','partnerName','mrr','owner','closeDate','useCase','nextStep','account','stageName'];
  constructor(private remoteActions: RemoteActionsService, private globals :Globals) { }

  ngOnInit() {
    this.remoteActions.isAdmin()
    .then(result => {
      this.globals.isAdmin = result as boolean;
      this.remoteActions.getOppForHomePage()
      .then(results => {
        console.log(results);
        this.mapObject(results);
      }).catch(error => {console.log(error)})

    }).catch(err => {console.log(err)});
  }

  private mapObject(arr) {
    this.dataSource = new Array<Opportunity>();

    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      let o = new Opportunity(obj);
      this.dataSource.push(o);
    }
    
  }
}
