import { Component, OnInit } from '@angular/core';
import {Globals} from '../../globals';
@Component({
  selector: 'app-company-section',
  templateUrl: './company-section.component.html',
  styleUrls: ['./company-section.component.css']
})
export class CompanySectionComponent implements OnInit {

  constructor(public globals:Globals) { }

  ngOnInit() {
  }

}
