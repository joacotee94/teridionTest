import { Component, OnInit } from '@angular/core';
import {Globals} from '../../globals';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  constructor(private globals:Globals) {
    globals.title=''; 
   }

  ngOnInit() {
  }

}
