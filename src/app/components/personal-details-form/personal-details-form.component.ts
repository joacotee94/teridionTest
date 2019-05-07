import { Component, OnInit } from '@angular/core';
import {Globals} from '../../globals';
@Component({
  selector: 'app-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.css']
})
export class PersonalDetailsFormComponent implements OnInit {

  constructor(private globals: Globals) {
    this.globals.title='MY COMPANY DETAILS';
   }

  ngOnInit() {
  }

}
