import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import {Globals} from '../../globals';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent  {
  public isCollapsed = true;
  @Output() public sidenavToggle = new EventEmitter();
 
  constructor(public globals:Globals) { }
 
  ngOnInit() {
  }
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
