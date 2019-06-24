import { Component, OnInit } from '@angular/core';
import { RemoteActionsService } from '../../services/remote-actions';
import { Globals } from '../../globals';
@Component({
  selector: 'app-small-user-list',
  templateUrl: './small-user-list.component.html',
  styleUrls: ['./small-user-list.component.css']
})
export class SmallUserListComponent implements OnInit {

  dataSource: Array<Object>;
  displayedColumns = ['FirstName', 'LastName', 'userType'];
  constructor(private remoteAction: RemoteActionsService,private globals: Globals) { }

  ngOnInit() {
    this.remoteAction.getUsers().then((res) => {this.dataSource = res as Array<Object>}).catch(err=>console.log(err));
  }

}
