import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import {Globals} from '../../globals';
import {RemoteActionsService} from  '../../services/remote-actions';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent  {
  public isCollapsed = true;
  userName:string;
  @Output() public sidenavToggle = new EventEmitter();
 
  constructor(public globals:Globals, private remoteActions:RemoteActionsService) { 
    this.remoteActions.getUserName()
    .then((res)=>{
      this.userName= res as string;
    }).catch((err)=>console.log(err));

  }
 
  ngOnInit() {
  }
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
